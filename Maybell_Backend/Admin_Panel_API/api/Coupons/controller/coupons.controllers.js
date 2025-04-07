// Imports & Configs
const CouponsModel = require("../model/coupons.model");

// Create New Coupon Data
exports.create = async (req, res) => {
  try {
    const {
      name,
      code,
      start_date,
      end_date,
      start_price,
      end_price,
      discount,
      order,
    } = req.body;

    const getAllData = await CouponsModel.find();

    let lastOrderValue = 0;
    if (getAllData.length >= 1) {
      lastOrderValue = getAllData[getAllData.length - 1].order;
    }

    const data = {
      name,
      code,
      start_date: start_date ? start_date : new Date(),
      end_date,
      start_price,
      end_price,
      discount: discount ? discount : 0,
      order: order ? order : lastOrderValue + 1,
    };

    const createData = await CouponsModel.create(data);
    await createData.save();

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully!!",
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

// Get All Coupons Data
exports.getAll = async (req, res) => {
  try {
    let limit = parseInt(req?.body?.limit) || 15;
    let page = parseInt(req?.body?.page) || 1;
    if (limit < 1) limit = 15;
    if (page < 1) page = 1;

    let skip = (page - 1) * limit;
    const { name, code } = req.body;

    const filter = { deletedAt: null };

    if (name != "" && name != undefined) {
      var nameRegex = new RegExp(name, "i");
      filter.name = nameRegex;
    }
    if (code != "" && code != undefined) {
      var codeRegex = new RegExp(code, "i");
      filter.code = codeRegex;
    }

    const getAllData = await CouponsModel.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({
        _id: "desc",
      });

    return res.status(200).json({
      success: true,
      totalRecords: getAllData.length >= 1 ? getAllData.length : 0,
      message:
        getAllData.length >= 1
          ? "Fetched data successfully!!"
          : "No Records Found",
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

// Get Coupons Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await CouponsModel.findOne({ ...filter, _id: id });

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

// Update Coupons Data By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      start_date,
      end_date,
      start_price,
      end_price,
      discount,
      order,
    } = req.body;

    const existingData = await CouponsModel.find({ _id: id });

    if (!existingData) {
      return res.status(400).json({
        success: false,
        message: "Data not found!!",
        data: {},
      });
    }

    const data = {
      name: name ? name : existingData.name,
      code: code ? code : existingData.code,
      start_date: start_date ? start_date : existingData.start_date,
      end_date: end_date ? end_date : existingData.end_date,
      start_price: start_price ? start_price : existingData.start_price,
      end_price: end_price ? end_price : existingData.end_price,
      discount: discount ? discount : existingData.discount,
      order: order ? order : existingData.order,
    };

    const updateData = await CouponsModel.updateOne(
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

// Change Coupons Status
exports.updateStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await CouponsModel.updateMany({ _id: { $in: ids } }, [
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

// Delete Coupons Data By Ids
exports.delete = async (req, res) => {
  try {
    const { ids } = req.body;

    const deleteData = await CouponsModel.updateMany(
      { _id: { $in: ids } },
      { $set: { deletedAt: Date.now() } }
    );

    return res.status(201).json({
      success: true,
      message: "Data deleted successfully!!",
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
