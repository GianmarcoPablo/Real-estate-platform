import { Dtos } from "../../types/dtos"
import { UserEntity } from "../"

export abstract class AuthRepository {
    //todo
    abstract register(dtos: Dtos): Promise<UserEntity>;
}