import { CustomError, UserEntity } from "../../domain";


export class UserMapper {


    static userEntityFromObject(object: { [key: string]: any }) {

        const { id, firstName, lastName, email, password, role, image } = object;

        if (!id) throw CustomError.badRequest("Missing fields");
        if (!firstName) throw CustomError.badRequest("Missing fields");
        if (!lastName) throw CustomError.badRequest("Missing fields");
        if (!email) throw CustomError.badRequest("Missing fields");
        if (!password) throw CustomError.badRequest("Missing fields");
        if (!role) throw CustomError.badRequest("Missing fields");

        return new UserEntity(
            id,
            firstName,
            lastName,
            email,
            password,
            role,
            image
        )
    }
}