import cors from "cors";
import express from "express";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";

const PORT = 3333;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
