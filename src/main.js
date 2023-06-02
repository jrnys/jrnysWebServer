import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import userRoutes from "./app/routes/userRoutes.js";
import dotenv from 'dotenv';


function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(400).json({ message: err.message });
}


//firebase-key.json
const obj = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key":process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes.routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log("Service endpoint= %s", config.url);
});
