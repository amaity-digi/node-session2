const http = require("http");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const usersData = [
  {
    id: 1,
    name: "Rahul Kumar",
  },
  {
    id: 2,
    name: "Akash Jha",
  },
  {
    id: 3,
    name: "Sai Kumar",
  },
];

app.get("/", function (req, res) {
  res.json(usersData);
});

app.get("/:id", function (req, res) {
  const { id } = req.params;
  //   console.log("id", typeof id);
  res.json(usersData.filter((user) => user.id === +id));
});

app.post("/", (req, res) => {
  console.log(req.body);
  usersData.push({ id: usersData.length + 1, ...req.body });
  console.log("data", usersData);
  res.json({ code: "200", message: "success", data: usersData });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = usersData.findIndex(function (user) {
    return user.id === +id;
  });
  if (index > -1) {
    usersData[index] = {
      ...usersData[index],
      name,
    };
  }
  res.json(usersData);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = usersData.findIndex(function (user) {
    return user.id === +id;
  });
  usersData.splice(index, 1);
  res.json(usersData);
});

app.listen(PORT, function () {
  console.log(`Express server is running at port: http://localhost:${PORT}`);
});

// console.log(app);
// console.log("Hello", process.env);

// http.createServer((req, res) => {
//   res.write("Node server");
//   res.end();
// }).listen(process.env.PORT);

//Express is build on top of node, So we are able to use what all node modules we have. like os module, file module.
