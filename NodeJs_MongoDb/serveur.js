const express = require('express');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});


const uri = "mongodb://admin:pass123@localhost:27017/?authSource=admin";
// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/?authSource=admin`;

const client = new MongoClient(uri);
let db;

async function main() {
    const connection = await client.connect().then(
        client => {
            db = client.db("MEAN");

            app.get("/catalogue", async (req, res) => {
                console.log("/catalogue");
                let documents = await db.collection("articles").find().toArray();
                res.json(documents);
            });
            app.get("/catalogue/:rayon/:marque/:prixMax", async (req, res) => {
                console.log("/catalogue/" + req.params.rayon + "/" + req.params.marque + "/" + req.params.prixMax);
                let filters = {};
                if (req.params.rayon != "*") {
                    filters['rayon'] = req.params.rayon;
                }
                if (req.params.marque != "*") {
                    filters['marque'] = req.params.marque;
                }
                if (req.params.prixMax != "*") {
                    filters['prix'] = { $lt: parseFloat(req.params.prixMax) };
                }
                console.log(filters);
                let documents = await db.collection("articles").find(filters).toArray();
                res.json(documents);
            });

            app.get("/catalogue/rayons", async (_, res) => {
                console.log("/rayons");
                rayons = [];
                let documents = await db.collection("articles").find().toArray();
                for (let doc of documents) {
                    if (!rayons.includes(doc.rayon)) rayons.push(doc.rayon);
                }

                // const rayons = await db.collection("articles").distinct("rayon");
                res.json(rayons);
            });
        });

        app.post("/user/connexion", async (req,res) => {
			console.log("/user/connexion avec ", req.body);
			let document = await db.collection("users").find(req.body).toArray();
			if (document.length == 1)
				res.json({"resultat": 1, "message": "Authentification réussie"});
			else res.json({"resultat": 0, "message": "Email et/ou mot de passe incorrect"});
		});


    app.listen(8888, () => console.log("Serveur lancé sur http://localhost:8888"));
}
main();