// const express=require("express");
import express from "express";
import todoRoutes from "./routes/todo";
import bodyParser from "body-parser";
const app= express();

app.use(bodyParser.json());


 app.use(todoRoutes);
app.listen(2000);