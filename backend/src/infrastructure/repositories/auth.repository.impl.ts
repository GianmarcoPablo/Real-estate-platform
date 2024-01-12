import { Dtos } from "../../types/dtos";
import { AuthRepository, UserEntity, AuthDatasource } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly datasources: AuthDatasource
    ) { }

    public async register(dtos: Dtos): Promise<UserEntity> {
        return await this.datasources.register(dtos);
    }

}