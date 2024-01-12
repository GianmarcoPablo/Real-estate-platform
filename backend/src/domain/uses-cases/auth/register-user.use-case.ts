import { JwtAdapter } from "../../../config"
import { CustomError } from "../../errors/custom.error"
import { AuthRepository } from "../../repositories/auth.repository"
import { Dtos } from "../../../types/dtos"

interface UserToken {
    token: string,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
    }
}

type SignToken = (payload: Object, duration: string) => Promise<string | null>

interface registerUserUseCase {
    execute: (dtos: Dtos) => Promise<UserToken>
}

export class RegisterUserUseCase implements registerUserUseCase {

    constructor(
        private readonly repository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }

    async execute(dtos: Dtos): Promise<UserToken> {
        const user = await this.repository.register(dtos)
        const token = await this.signToken({ id: user.id }, "30d")
        if (!token) throw CustomError.internalServerError("Error generating token")
        return {
            token: token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        }
    }
}