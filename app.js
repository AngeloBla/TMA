const uri = "mongodb+srv://angelobla:cMIsyvNAA2oNvLn1@cluster0.3bizzkl.mongodb.net/Todo?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const express = require('express');
const app = express();
const port = 3000;

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});


// MongoDB-Verbindung herstellen
mongoose.connect("mongodb+srv://angelobla:cMIsyvNAA2oNvLn1@cluster0.3bizzkl.mongodb.net/Todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Could not connect to MongoDB', err);
});



const aufgabenSchema = new Schema({
  Titel: { type: String, required: true, maxLength: 100 },
  Beschreibung: { type: String, maxLength: 100 },
  Erstellungsdatum: { type: Date, default: Date.now },
  Fälligkeitsdatum: { type: Date },
  Status: { type: String, default: 'offen', maxLength: 100 }
});

const Aufgaben = mongoose.model('Todo', aufgabenSchema, "Aufgaben");

app.use(express.json());

/////////////////////////////////////////////////////////////////////////////

app.get('/tasks', async (req, res) => {
    try {
      // Alle Aufgaben aus der Datenbank abrufen
      const aufgaben = await Aufgaben.find();
  
      // Erfolgsantwort mit den abgerufenen Aufgaben senden
      res.send({ success: true, data: aufgaben });
    } catch (error) {
      // Bei einem Fehler sende eine Fehlerantwort
      res.send({ success: false, error: error.message });
    }
});

app.post('/tasks', async (req, res) => {
    try {
      // Alle Aufgaben aus der Datenbank abrufen
      const aufgaben = await Aufgaben.find();
  
      // Erfolgsantwort mit den abgerufenen Aufgaben senden
      res.send({ success: true, data: aufgaben });
    } catch (error) {
      // Bei einem Fehler sende eine Fehlerantwort
      res.send({ success: false, error: error.message });
    }
});
/////////////////////////////////////////////////////////////////////////////
 
  
// GET-Route zum Abrufen aller Aufgaben
app.get('/aufgaben', async (req, res) => {
    try {
      // Alle Aufgaben aus der Datenbank abrufen
      const aufgaben = await Aufgaben.find();
  
      // Erfolgsantwort mit den abgerufenen Aufgaben senden
      res.status(200).json({ success: true, data: aufgaben });
    } catch (error) {
      // Bei einem Fehler sende eine Fehlerantwort
      res.status(500).json({ success: false, error: error.message });
    }
});
  


app.post('/aufgaben', async (req, res) => {
  try {
    const { Titel, Beschreibung, Fälligkeitsdatum } = req.body;

    const neueAufgabe = new Aufgaben({
      Titel,
      Beschreibung,
      Fälligkeitsdatum
    });

    await neueAufgabe.save();

    res.status(201).json({ success: true, message: 'Aufgabe erfolgreich erstellt' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


/////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Der Server hört auf Port ${port}`);
});