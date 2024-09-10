import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from 'path';
import cors from 'cors';
import manageSecretsRoute from './routes/manageSecrets.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000; // PORT number




app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build'))); // Serve the static files from the React app
app.use(express.json())

//CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials:true
  }));



app.use('/api', manageSecretsRoute);




  //think about it
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

