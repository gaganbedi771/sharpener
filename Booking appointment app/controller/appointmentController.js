const db = require("../utils/db_connection");
const Appointment = require("../models/appointment");

exports.getAll = async (req, res) => {
  console.log("getall");
  try {
    const allAppointments = await Appointment.findAll();
    res.json(allAppointments);
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res) => {
  console.log("getOne");
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ where: { id } });
    res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};

exports.add = async (req, res) => {
  console.log("add");
  try {
    const { name, email } = req.body;
    const appointment = await Appointment.create({ name, email });
    res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  console.log("delete");
  try {
    const { id } = req.params;
    await Appointment.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  console.log("edit");
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const appointment = await Appointment.findOne({ where: { id } });
    appointment.name = name ? name : appointment.name;
    appointment.email = email ? email : appointment.email;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};
