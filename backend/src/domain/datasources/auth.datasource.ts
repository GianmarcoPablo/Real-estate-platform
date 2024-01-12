import { UserEntity } from "../entities/user.entity";
import { Dtos } from "../../types/dtos";

export abstract class AuthDatasource {
    abstract register(dtos: Dtos): Promise<UserEntity>;
}