import e from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "node:path";
import cors from "cors";

import { routerApi } from "../routes/routes.js";
import { Handler } from "../middlewares/auth.handler.js";
import { cwd } from "node:process";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = e();
app.disable("x-powered-by");
app.use(cors());
app.use(e.json());
app.use(cookieParser());
app.use(e.static(path.join(cwd(), './public')))

app.get("/", (req, res) => {
  res.sendFile(path.join(cwd(), './public/home.html'))
});

app.get("/personeria", Handler.authVerify, (req, res) => { 
  res.sendFile(path.join(cwd(), './public/personeria.html'))
});

app.get("/contraloria", Handler.authVerify, (req, res) => {
  res.sendFile(path.join(cwd(), './public/contraloria.html'))
})

app.get("/gracias", Handler.authVerify, (req, res) => {
  res.sendFile(path.join(cwd(), './public/thanks.html'))
})

routerApi(app);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetch(`${process.env.URL_SERVER}/authorization`, {
    method: "POST",
    headers: {
      "Authorization": `${process.env.TOKEN}`,
      "Content-Type": "application/json",
    }
  }).then(data => {
    if (data.status == 200) console.log("Connected")
  }).catch(err => {
    console.log("No conectado al servidor principal")
  })
});
