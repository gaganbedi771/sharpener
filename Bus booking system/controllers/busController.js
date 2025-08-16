const db = require("../utils/db_connection");

exports.addbus = (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;

  const query = `insert into bus (busNumber,totalSeats,availableSeats) values (?,?,?)`;

  db.execute(query, [busNumber, totalSeats, availableSeats], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong at server side");
      res.send("Something went wrong at server side");
    }
    res.send("Bus added");
  });
};

exports.getBusesWithAvailableSeats = (req, res) => {
  const requiredSeats = req.params.seats;

  const query = `select * from bus where availableSeats >= ? `;

  db.execute(query, [requiredSeats], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong at server side");
      res.send("Something went wrong at server side");
    }
    res.send(result);
  });
};
