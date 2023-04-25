const Repair = require("../models/repair.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

// Método GET global
exports.findAllPending = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: "pending",
    },
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "password", "status"],
        },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    result: repairs.length,
    repairs,
  });
});
exports.findAllCompleted = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: "completed",
    },
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "password", "status"],
        },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    result: repairs.length,
    repairs,
  });
});

// Método GET individual/específico
exports.findOne = catchAsync(async (req, res) => {
  const { repair } = req;

  res.status(200).json({
    status: "success",
    message: "The query has been done successfully",
    repair,
  });
});

// Método POST
exports.create = catchAsync(async (req, res) => {
  const { date, motorsNumber, description } = req.body;

  const { sessionUser } = req;

  const repair = await Repair.create({
    date: new Date(),
    motorsNumber,
    description,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: "success",
    message: "Repair information created successfully",
    repair,
  });
});

// Método PATCH
exports.update = catchAsync(async (req, res) => {
  const { repair } = req;

  const { status } = req.body;

  await repair.update({
    status: "completed",
  });

  res.status(200).json({
    status: "success",
    message: "Repair information has been updated successfully",
  });
});

// Método DELETE
exports.delete = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: "canceled" });

  res.json({
    message: "Repair information has been deleted",
  });
});
