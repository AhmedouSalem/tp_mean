const express = require("express");
/** @type {import("mongodb").MongoClient} */
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/?authSource=admin`;
const client = new MongoClient(uri);
/** @type {import("mongodb").Db} */
let db;

async function main() {
    await client.connect().then(client => {
        db = client.db(process.env.DB_NAME);


        // Start - Gérer des utilisateurs
        app.post("/users", async (req, res) => {
            const email = req.body.email;
            console.log(email);
            console.log("/users", req.body);
            try {
                let document = await db.collection("users").find({ "email": email }).toArray();
                if (document.length == 1) {
                    res.status(400).json({ success: false, message: "Utilisateur existe déjà !" });
                }
                else {
                    const result = await db.collection("users").insertOne(req.body);
                    res.json({ insertedId: result.insertedId });
                }
            } catch (error) {
                res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
            }
        });

        app.post("/users/authenticate", async (req, res) => {
            console.log("/users/authenticate", req.body);
            let documents = await db.collection("users").find(req.body).toArray();
            if (documents.length != 1) {
                res.json({ "resultat": 0, "message": "Email et/ou mot de passe incorrect" });
            } else {
                res.json({ "resultat": 1, "message": "Authentification réussie" });
            }
        });

        app.delete("/users/:userId", async (req, res) => {
            const userId = req.params.userId;

            try {
                const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });

                if (result.deletedCount === 1) {
                    res.json({ success: true, message: "Utilisateur supprimé avec succès" });
                } else {
                    res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
                }
            } catch (error) {
                res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
            }
        });
        // End - Gérer les utilisateurs

        // Start - Gérer les articles
        app.post("/articles", async (req, res) => {
            console.log("Type de prix :", typeof req.body.prix);
            try {
                const result = await db.collection("articles").insertOne(req.body);
                console.log("Résultat de l'insertion :", result);
                if (result.insertedId != null) {
                    res.json({ success: true, message: result.insertedId });
                } else {
                    res.status(400).json({ success: false, message: "Erreur d'ajout de l'article" });
                }
            } catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
        
        app.get("/test-insert", async (req, res) => {
            const article = {
                nom: "Article test direct",
                marque: "Test",
                prix: 123,
                stock: 5,
                rayon: "Divers",
                detail: "test",
                descr: "Article d'essai"
            };
            const result = await db.collection("articles").insertOne(article);
            res.json({ insertedId: result.insertedId });
        });
        
        app.get("/catalogue/:rayon/:marque/:prixMax", async(req, res) => {
            console.log("/catalogue/" + req.params.rayon + "/" + req.params.marque + "/" + req.params.prixMax);
            const filter = {};
            if(req.params.rayon != "*") filter['rayon']=req.params.rayon;
            if(req.params.marque != "*") filter['marque']=req.params.marque;
            if(req.params.prixMax != "*") filter['prix']= {$lt: parseFloat(req.params.prixMax)};

            try {
                let documents = await db.collection("articles").find(filter).toArray();
                res.json(documents);
            } catch (error) {
                res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
            }
        });

    });

    app.listen(8888, () => console.log("Serveur lancé à l'adresse : http://localhost:8888"));
}

main();