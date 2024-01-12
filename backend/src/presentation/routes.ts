import { Router } from "express";
import { UserRouter } from "./auth/users/users.routes";



export class RouterBase {

    public static startRoutes(): Router {
        const router = Router();

        router.use('/v1/auth', UserRouter.startRoutes());


        return router;
    }
}