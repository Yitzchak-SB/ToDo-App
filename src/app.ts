import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import credentials from "./credentials.config";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb+srv://${credentials.MONGO_USER}:${credentials.MONGO_PASSWORD}@cluster0.yoryx.mongodb.net/${credentials.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

console.log(uri);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error);

    throw error;
  });
