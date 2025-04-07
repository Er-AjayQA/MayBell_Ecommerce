// Imports & Configs
const SlidersModel = require("../model/sliders.model");

// Create New Slider Data
exports.create = async (req, res) => {
  try {
    const { title, slider_order } = req.body;
    const image_path = req.file.path;

    if (!image_path) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded!!",
      });
    }

    const getAllData = await SlidersModel.find();

    let lastOrderValue = 0;
    if (getAllData.length >= 1) {
      lastOrderValue = getAllData[getAllData.length - 1].order;
    }

    const data = {
      title,
      slider_order,
      image: image_path,
      order: lastOrderValue + 1,
    };

    const createData = await SlidersModel.create(data);
    await createData.save();

    return res.status(201).json({
      success: true,
      message: "Slider created successfully!!",
      data: createData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// View All Sliders Data
exports.getAll = async (req, res) => {
  try {
    const { title } = req.body;
    let limit = parseInt(req?.body?.limit) || 15;
    let page = parseInt(req?.body?.page) || 1;
    if (limit < 1) limit = 15;
    if (page < 1) page = 1;

    let skip = (page - 1) * limit;

    const filter = { deletedAt: null };

    if (title != "" && title != undefined) {
      var titleRegex = new RegExp(title, "i");
      filter.title = titleRegex;
    }

    const getAllData = await SlidersModel.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({
        _id: "desc",
      });

    const statusCode = getAllData.length >= 1 ? 200 : 404;
    const success = getAllData.length >= 1 ? true : false;
    const message =
      getAllData.length >= 1
        ? "Fetched data successfully!!"
        : "No Records Found";

    return res.status(statusCode).json({
      success,
      totalRecords: getAllData.length >= 1 ? getAllData.length : 0,
      message,
      data: getAllData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// View Slider Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await SlidersModel.findOne({ ...filter, _id: id });

    const success = !getDetails ? false : true;
    const responseStatus = !getDetails ? 404 : 200;
    const message = !getDetails
      ? "Data not found!!"
      : "Fetched details successfully!!";

    return res.status(responseStatus).json({
      success,
      message,
      data: getDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Update Slider Data By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slider_order } = req.body;
    const image_path = req.file.path;

    const existedSlider = await SlidersModel.findOne({ _id: id });

    if (!existedSlider) {
      return res.status(400).json({
        success: false,
        message: "Data not found!!",
        data: {},
      });
    }

    const data = {
      title: title ? title : existedSlider.title,
      slider_order: slider_order ? slider_order : existedSlider.slider_order,
      image: image_path ? image_path : existedSlider.image_path,
    };

    const updateData = await SlidersModel.updateOne(
      { _id: id },
      { $set: data }
    );

    return res.status(201).json({
      success: true,
      message: "Data updated successfully!!",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Change Slider Status
exports.updateStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await SlidersModel.updateMany({ _id: { $in: ids } }, [
      { $set: { status: { $not: "$status" } } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Status changed successfully!!",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Delete Slider Data By Ids
exports.delete = async (req, res) => {
  try {
    const { ids } = req.body;

    const deleteData = await SlidersModel.updateMany(
      { _id: { $in: ids } },
      { $set: { deletedAt: Date.now() } }
    );

    return res.status(201).json({
      success: true,
      message: "Colors deleted successfully!!",
      data: deleteData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};
