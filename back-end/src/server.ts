import express, { Response, Request } from "express";
import { json } from "body-parser";
import cors from "cors";
import { calculate_router } from "./router/calculate_router";
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express();
var corsOptions = {
  // origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(json());

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send("welcome to wolt booking");
  } catch (error) {}
});
app.use(calculate_router);
app.listen(PORT, () => {
  console.log(`listening at ${PORT}....`);
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.json({ msg: "fail" });
  } else if (req.accepts("json")) {
    res.json({ msg: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
