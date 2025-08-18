const db = require("../utils/db_connection");
const { Op } = require("sequelize");
const { Bus, Booking } = require("../models/index");

exports.addbus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;

    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    if (!bus) {
      return res.send("Error at server end");
    }
    res.send(bus);
  } catch (error) {
    console.log(error);
  }
};

exports.getBusesWithAvailableSeats = async (req, res) => {
  try {
    const requiredSeats = req.params.seats;

    const busesWithAvailableSeats = await Bus.findAll({
      where: { availableSeats: { [Op.gte]: requiredSeats } },
    });

    if (!busesWithAvailableSeats) {
      return res.send("No busses found");
    }
    res.send(busesWithAvailableSeats);
  } catch (error) {
    console.log(error);
  }
};

exports.getBookingsByBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingsByBus = await Bus.findByPk(id, { include: Booking });
    res.json(bookingsByBus);
  } catch (error) {
    console.log(error);
  }
};
