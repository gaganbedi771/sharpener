const Player = require("../models/player");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.log(error);
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByPk(id);
    if (!player) {
      res.json("Something went wrong");
    }
    res.json(player);
  } catch (error) {
    console.log(error);
  }
};

exports.addPlayer = async (req, res) => {
  try {
    const {
      name,
      dob,
      photo,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    } = req.body;

    const player = await Player.create({
      name,
      dob,
      photo,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    });

    res.json(player);
  } catch (error) {
    console.log(error);
  }
};

exports.editPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      dob,
      photo,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    } = req.body;

    const player = await Player.findByPk(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    player.name = name ?? player.name;
    player.dob = dob ?? player.dob;
    player.photo = photo ?? player.photo;
    player.birthplace = birthplace ?? player.birthplace;
    player.career = career ?? player.career;
    player.matches = matches ?? player.matches;
    player.score = score ?? player.score;
    player.fifties = fifties ?? player.fifties;
    player.centuries = centuries ?? player.centuries;
    player.wickets = wickets ?? player.wickets;
    player.average = average ?? player.average;

    await player.save();

    res.json(player);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    await Player.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
