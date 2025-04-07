// Imports & Configs
const TestimonialsModel = require("../model/testimonials.model");

// Create New Testimonials Data
exports.create = async (req, res) => {
  try {
    const { name, designation, rating, testimonial_order, message } = req.body;
    const image_path = req.file.path;

    if (!image_path) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded!!",
      });
    }

    const getAllData = await TestimonialsModel.find();

    let lastOrderValue = 0;
    if (getAllData.length >= 1) {
      lastOrderValue = getAllData[getAllData.length - 1].order;
    }

    const data = {
      name,
      designation,
      rating,
      testimonial_order,
      message,
      image: image_path,
      order: lastOrderValue + 1,
    };

    const createData = await TestimonialsModel.create(data);
    await createData.save();

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully!!",
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

// View All Testimonials Data
exports.getAll = async (req, res) => {
  try {
    const { name, designation, rating } = req.body;
    let limit = parseInt(req?.body?.limit) || 15;
    let page = parseInt(req?.body?.page) || 1;
    if (limit < 1) limit = 15;
    if (page < 1) page = 1;

    let skip = (page - 1) * limit;

    const filter = { deletedAt: null };

    if (name != "" && name != undefined) {
      var nameRegex = new RegExp(name, "i");
      filter.name = nameRegex;
    }
    if (designation != "" && designation != undefined) {
      var designationRegex = new RegExp(designation, "i");
      filter.designation = designationRegex;
    }
    if (rating != "" && rating != undefined) {
      var ratingRegex = new RegExp(rating, "i");
      filter.rating = ratingRegex;
    }

    const getAllData = await TestimonialsModel.find(filter)
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

// View Testimonials Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await TestimonialsModel.findOne({ ...filter, _id: id });

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

// Update Testimonials Data By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, rating, testimonial_order, message } = req.body;
    const image_path = req.file.path;

    const existedData = await TestimonialsModel.findOne({ _id: id });

    if (!existedData) {
      return res.status(400).json({
        success: false,
        message: "Data not found!!",
        data: {},
      });
    }

    const data = {
      name: name ? name : existedData.name,
      designation: designation ? designation : existedData.designation,
      rating: rating ? rating : existedData.rating,
      testimonial_order: testimonial_order
        ? testimonial_order
        : existedData.testimonial_order,
      message: message ? message : existedData.message,
      image: image_path ? image_path : existedData.image_path,
    };

    const updateData = await TestimonialsModel.updateOne(
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

// Change Testimonials Status
exports.updateStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await TestimonialsModel.updateMany(
      { _id: { $in: ids } },
      [{ $set: { status: { $not: "$status" } } }]
    );

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

// Delete Testimonials Data By Ids
exports.delete = async (req, res) => {
  try {
    const { ids } = req.body;

    const deleteData = await TestimonialsModel.updateMany(
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
