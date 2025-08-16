const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "bus_booking",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected");

  const createUser = `create table if not exists user (
    id int auto_increment primary key,
    name varchar(20),
    email varchar(20)
    )`;

  const createBus = `create table if not exists bus (
    id int auto_increment primary key,
    busNumber int not null,
    totalSeats int not null,
    availableSeats int not null    
    )`;

  const createBooking = `create table if not exists booking (
    id int auto_increment primary key,
    seatNumber int not null    
    )`;

  const createPayment = `create table if not exists payment (
    id int auto_increment primary key,
    amountPaid int not null,
    paymentStatus enum('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING'  
    )`;

  connection.execute(createUser, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("User tabel created");
  });
  connection.execute(createBus, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Bus tabel created");
  });
  connection.execute(createBooking, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Booking tabel created");
  });
  connection.execute(createPayment, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Payment tabel created");
  });
});

module.exports = connection;
