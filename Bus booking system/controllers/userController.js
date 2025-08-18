const db = require("../utils/db_connection");
const { User, Booking, Bus } = require("../models/index");

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    if (!user) {
      return res.send("Error at server end");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.send("No user found");
    }
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.userBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const bus = await Bus.findOne({ where: { id: busId } });
    if (!bus) {
      return res.status(404).send("Bus not found");
    }
    const booking = await Booking.create({ userId, busId, seatNumber });

    res.json(booking);
  } catch (error) {
    console.log(error);
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userBooking = await User.findByPk(id, { include: Booking });
    res.json(userBooking);
  } catch (error) {
    console.log(error);
  }
};
