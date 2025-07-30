import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import recipeRoute from "./recipeRoutes.ts";

const app = express();

// ✅ Update CORS origin to 8081
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(bodyParser.json());
app.use(recipeRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
