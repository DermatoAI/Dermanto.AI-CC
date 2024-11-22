 
import express from 'express';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/test", async (req, res) => {
    try {
        const docRef = await addDoc(collection(db, "test"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
        });

        console.log("Document written with ID: ", docRef.id);
        res.send("Document has been saved!");
    } catch (e) {
        console.error("Error adding document: ", e);
        res.status(500).send("Error adding document.");
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
