import { UserEntity, AuthDatasource, CustomError } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { HashPasswordAdapter } from "../../config";
import { Dtos } from "../../types/dtos";
import { prisma } from "../../data/postgresql"

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = HashPasswordAdapter.hashPaassword,
        private readonly comparePassword: CompareFunction = HashPasswordAdapter.comparePassword
    ) { }

    public async register(dtos: Dtos): Promise<UserEntity> {
        const { registerUserDto, fieldsAgentDto } = dtos;
        const { firstName, email, password, lastName, role } = registerUserDto;
        const { experience, specialty, location, rating, contactNumber } = fieldsAgentDto;

        const rolesValid = ["User", "EstateAgent", "Admin", "Moderator"];
        if (!rolesValid.includes(role!)) throw CustomError.badRequest("Invalid role");
        try {
            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) throw CustomError.badRequest("User already exists");

            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: this.hashPassword(password),
                    role: role || "User"
                }
            })

            switch (user.role) {
                case "User":
                    await prisma.normalUser.create({
                        data: {
                            userId: user.id
                        }
                    })
                    break;
                case "EstateAgent":
                    try {
                        await prisma.realEstateAgent.create({
                            data: {
                                userId: user.id,
                                experience,
                                specialty,
                                location,
                                rating,
                                contactNumber
                            }
                        })
                        break;
                    } catch (error) {
                        console.log(error)
                    }
                case "Admin":
                    await prisma.administrator.create({
                        data: {
                            userId: user.id
                        }
                    })
                    break;
                case "Moderator":
                    await prisma.moderator.create({
                        data: {
                            userId: user.id,
                        }
                    })
                    break;
                default:
                    break;
            }

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }
}