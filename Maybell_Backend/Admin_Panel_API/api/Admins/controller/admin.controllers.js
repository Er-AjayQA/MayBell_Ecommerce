// Imports & Configs
const AdminsModel = require("../model/admin.model");

// Create New Admin Data
exports.create = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const getAllData = await AdminsModel.find();

    let lastOrderValue = 0;
    if (getAllData.length >= 1) {
      lastOrderValue = getAllData[getAllData.length - 1].order;
    }

    const data = { name, email, mobile, order: lastOrderValue + 1 };

    const createData = await AdminsModel.create(data);
    await createData.save();

    return res.status(201).json({
      success: true,
      message: "Admin created successfully!!",
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

// View All Admins Data
exports.getAll = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
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
    if (email != "" && email != undefined) {
      var emailRegex = new RegExp(email, "i");
      filter.email = emailRegex;
    }

    if (mobile != "" && mobile != undefined) {
      var mobileRegex = new RegExp(mobile, "i");
      filter.mobile = mobileRegex;
    }

    const getAllData = await AdminsModel.find(filter)
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
      message: message,
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

// View Admin Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await AdminsModel.findOne({ ...filter, _id: id });

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

// Update Admin Data By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    const data = { name, email, mobile };

    const updateData = await AdminsModel.updateOne({ _id: id }, { $set: data });

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

// Change Admin Status
exports.updateStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await AdminsModel.updateMany({ _id: { $in: ids } }, [
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

// Delete Admin Data By Ids
exports.delete = async (req, res) => {
  try {
    const { ids } = req.body;

    const deleteData = await AdminsModel.updateMany(
      { _id: { $in: ids } },
      { $set: { deletedAt: Date.now() } }
    );

    return res.status(201).json({
      success: true,
      message: "Admin deleted successfully!!",
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
