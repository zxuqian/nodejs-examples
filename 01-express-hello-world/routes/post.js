const express = require("express");
var route = express.Router();

route.get("/", (req, res) => {
  res.send({ id: 1, title: "express 入门教程" });
});

route.post("/", (req, res) => {
  console.log("保存文章", req.body);
  res.status(201).send({ id: 2, ...req.body });
});

route.put("/:id", (req, res) => {
  console.log("收到请求参数，文章id 为：", req.params.id);
  console.log("收到请求体，新的文章内容为：", req.body);

  res.send({ id: req.params.id, ...req.body });
});

route.delete("/:id", (req, res) => {
  console.log("收到请求参数，文章id 为：", req.params.id);
  res.status(204).send();
});

module.exports = route;
