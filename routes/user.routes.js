import { Router } from "express";
import { User } from "../models/user.js";
import { UserSchema } from "../schemas/user.schema.js";
import { Handler } from "../middlewares/auth.handler.js";

const router = Router();

router.post("/auth", (req, res) => {
  const { id, pin } = req.body;
  const dataVerify = UserSchema.validator({ id, pin });
  if (!dataVerify.success) { return res.json({ message: "Datos no validos" }) }
  const user = new User();
  user.login(dataVerify.data)
  .then(auth =>{
    res.cookie("access_token", auth, {
      httpOnly: true
    }).json({ message: "User logged in" });
  }).catch(err => {
    res.status(401).json({ error: err.message });
  });
});

router.post("/userState", Handler.authVerify, (req, res) => {
  const { id } = req.user;
  const user = new User();
  const data = UserSchema.userState({ id })
  if (!data.success) return res.json({ message: "Value out of range" })
  user.userState({ data }).then(data => {
    res.json(data)
  })
})

router.post("/personeria", Handler.authVerify, (req, res) => {
  const { id } = req.body;
  const user = new User();
  const data = UserSchema.personeria({ id })
  if (!data.success) return res.json({ message: "Value out of range" })
  user.personeria({ data }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(401).json(err)
  })
});

router.post("/contraloria", Handler.authVerify, (req, res) => {
    const { id } = req.body;
    const user = new User();
    const data = UserSchema.contraloria({ id })
    if (!data.success) return res.json({ message: "Value out of range" })
    user.contraloria({ data }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(401).json(err)
    })
});

router.post("/logout", Handler.authVerify, (req, res) => {
    res.clearCookie("access_token")
    .json({ message: "User logged out" });
});

export default router;
