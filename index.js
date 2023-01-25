//IMPORT REQUIRED MODULES
const { request, response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const { link } = require("fs");


//MONGO CONFIG
const dburl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dburl);

//SET UP EXPRESS APP AND PORT NUMBER

const app = express();
const port = process.env.PORT || 8888;

//SET UP TEMPLATE ENIGINE

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//SET UP STATIC file
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", (request, response) => {
  //response.status(200).send("Test page 1");
  links = await getLinks();
  response.render("index", { title: "Home" });
});

//SET UP SERVER LISTENING

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("/admin/menu", async (request, response) => {
  links = await getLinks();
  response.render("menu-list", { title: "Menu links admin", menu: links });
});

//MONGO FUNCTIONS
/* FUNCTION TO CONNECT TO DB AND RETURN THE "testdb" database.*/
async function connection() {
  await client.connect();
  db = client.db("testdb");
  return db;
}

/* FUNCTION TO SELECT ALL DOCUMENTS FROM MENULINKS*/

async function getLinks() {
  db = await connection();
  var results = db.collection("menuLinks").find({});
  res = await results.toArray(); //convert to an array
  return res;
}