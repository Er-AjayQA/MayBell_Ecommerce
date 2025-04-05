// Imports & Configs
const DefaultModel = require("../model/default.model");

// Create New Data
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const data = { name };

    const createDefaultData = await DefaultModel.create(data);
    await createDefaultData.save();

    return res.status(201).json({
      success: true,
      message: "Data created successfully!!",
      data: createDefaultData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!!" });
  }
};

// View All Data
exports.getAll = async (req, res) => {
  try {
    const filter = { deletedAt: null };

    const getAllData = await DefaultModel.find(filter);

    return res.status(200).json({
      success: true,
      message: "Fetched data successfully!!",
      data: getAllData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!!" });
  }
};

// View Details
exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { deletedAt: null };

    const getDetails = await DefaultModel.findOne({ ...filter, _id: id });

    return res.status(200).json({
      success: true,
      message: "Fetched details successfully!!",
      data: getDetails,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!!" });
  }
};

// Update Data By Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const data = { name };

    const updateData = await DefaultModel.updateOne(
      { _id: id },
      { $set: data }
    );

    return res.status(201).json({
      success: true,
      message: "Data updated successfully!!",
      data: updateData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!!" });
  }
};

// Change Status
exports.update = async (req, res) => {
  try {
    const { ids } = req.body;

    const updateData = await DefaultModel.updateMany({ _id: { $in: ids } }, [
      { $set: { status: { $not: "$status" } } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Status changed successfully!!",
      data: updateData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!!" });
  }
};
