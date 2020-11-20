import express from "express";
import { connectDatabase } from "./databaseUtils";

const app = express();
app.use(express.json());

connectDatabase()
  .then((database) => {
    app.listen(3000, () => console.log("Listen on port 3000"));
  })
  .catch((error) => {
    console.error("Algo ha fallado", error);
  });
