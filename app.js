const bodyParser = require("body-parser");
const express = require("express");
const shortid = require("shortid");
const path = require("path");

const utils = require("./utils.js");
const db = require("./db.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:link", (req, res) => {
    const id = req.params["link"];

    db
        .query(`SELECT url from links WHERE id='${id}'`)
        .then(r => res.redirect(r.rows[0]["url"]))
        .catch(e => res.status(404).send("404 not found"));
});

app.post("/", (req, res) => {
    const id = shortid.generate();
    const url = utils.addHttp(req.body.url);
    const date = new Date();

    db
        .query("INSERT INTO links VALUES($1, $2, $3)", [id, url, date])
        .then()
        .catch(e => console.error(e.stack));

    res.status(200).send(id);
});

app.listen(process.env.PORT || 3000, () =>
    console.log("mini-link app started")
);
