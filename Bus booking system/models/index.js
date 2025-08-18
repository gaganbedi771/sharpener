const Booking = require("./booking");
const Bus = require("./bus");
const Payment = require("./payment");
const User = require("./user");

User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking);
Booking.belongsTo(Bus);

module.exports = { Booking, Bus, Payment, User };
