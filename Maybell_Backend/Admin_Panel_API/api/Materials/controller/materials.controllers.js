// Imports & Configs
const MaterialsModel = require("../model/materials.model");

// Create New Material
exports.create = async (req, res) => {
  try {
    const { name, order } = req.body;

    let lastOrderValue = 0;

    // Get count to handle empty collection case
    const materialsCount = await MaterialsModel.countDocuments({
      deletedAt: null,
    });

    if (!order && materialsCount > 0) {
      const lastMaterial = await MaterialsModel.findOne({ deletedAt: null })
        .sort({ order: -1 })
        .limit(1);
      lastOrderValue = lastMaterial.order;
    }

    const alreadyExist = await MaterialsModel.findOne({
      $or: [{ name }, { order }],
      deletedAt: null,
    });

    if (alreadyExist) {
      return res.status(201).json({
        success: false,
        message: "Duplicate name || order no.!!",
        data: [],
      });
    }

    const data = { name, order: order ? order : lastOrderValue + 1 };

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
    let limit = parseInt(req?.body?.limit) || 100;
    let page = parseInt(req?.body?.page) || 1;
    if (limit < 1) limit = 15;
    if (page < 1) page = 1;
    const { name, sort } = req.body;

    let skip = (page - 1) * limit;

    const filter = { deletedAt: null };

    if (name != "" && name != undefined) {
      var nameRegex = new RegExp(name, "i");
      filter.name = nameRegex;
    }

    // Calculate total number of records
    const totalRecords = await MaterialsModel.countDocuments(filter);

    const getAllData = await MaterialsModel.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({
        _id: sort ? "asc" : "desc",
      });

    return res.status(200).json({
      success: true,
      totalRecords: totalRecords,
      totalPages: Math.max(1, Math.ceil(totalRecords / limit)),
      currentPage: page,
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

// Update Material By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, order } = req.body;

    const ifAlreadyExist = await MaterialsModel.find({
      _id: { $ne: id },
      deletedAt: null,
      $or: [{ name }, { order }],
    });

    if (ifAlreadyExist.length > 0) {
      return res.status(201).json({
        success: false,
        message: "Duplicate name || order!!",
        data: [],
      });
    }

    const data = {};
    if (name) data.name = name;
    if (order) data.order = order;

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
    const { id } = req.body;

    const updateData = await MaterialsModel.updateOne({ _id: id }, [
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

// Delete Single Data By Id
exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteData = await MaterialsModel.updateOne(
      {
        _id: id,
      },
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

// Delete Multiple Materials By Ids
exports.deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body;

    if (ids.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Select at least 1 record!!",
        data: [],
      });
    }

    const deleteData = await MaterialsModel.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      { $set: { deletedAt: Date.now() } }
    );

    return res.status(201).json({
      success: true,
      message: "Records deleted successfully!!",
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
