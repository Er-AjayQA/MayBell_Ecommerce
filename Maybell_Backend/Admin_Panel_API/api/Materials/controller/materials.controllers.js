// Imports & Configs
const MaterialsModel = require("../model/materials.model");

// Create New Material
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const getAllData = await MaterialsModel.find();

    let lastOrderValue = 0;
    if (getAllData.length >= 1) {
      lastOrderValue = getAllData[getAllData.length - 1].order;
    }

    const data = { name, order: lastOrderValue + 1 };

    const createMaterial = await MaterialsModel.create(data);
    await createMaterial.save();

    return res.status(201).json({
      success: true,
      message: "Material created successfully!!",
      data: createMaterial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Get All Materials
exports.getAll = async (req, res) => {
  try {
    let limit = parseInt(req?.body?.limit) || 15;
    let page = parseInt(req?.body?.page) || 1;
    if (limit < 1) limit = 15;
    if (page < 1) page = 1;

    let skip = (page - 1) * limit;

    const filter = { deletedAt: null };

    if (req.body.name != "" && req.body.name != undefined) {
      var nameRegex = new RegExp(req.body.name, "i");
      filter.name = nameRegex;
    }

    const getAllData = await MaterialsModel.find(filter)
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

// Get Material Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await MaterialsModel.findOne({ ...filter, _id: id });

    return res.status(200).json({
      success: true,
      message: "Fetched details successfully!!",
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

// Update Material By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const data = { name };

    const updateData = await MaterialsModel.updateOne(
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

// Change Status
exports.updateStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await MaterialsModel.updateMany({ _id: { $in: ids } }, [
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

// Delete Materials By Ids
exports.delete = async (req, res) => {
  try {
    const { ids } = req.body;

    const deleteData = await MaterialsModel.updateMany(
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
