import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../../infrastructure";
import { UserController } from "./users.controller";

export class UserRouter {

    public static startRoutes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const repository = new AuthRepositoryImpl(datasource);
        const controller = new UserController(repository);

        router.post('/login', controller.login);
        router.post('/register', controller.register);

        return router;
    }
}