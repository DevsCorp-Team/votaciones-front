import { Router } from "express";

import usersRoutes from "./user.routes.js";

export function routerApi(app) {
    const router = Router();
    app.use("/api", router);
    router.use("/user", usersRoutes);
}
