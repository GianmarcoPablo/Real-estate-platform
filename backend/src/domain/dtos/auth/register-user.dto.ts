import { Validators } from "../../../config";

export class RegisterUserDto {

    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role?: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { firstName, email, password, lastName, role } = object;


        if (!firstName) return ['firstName is required', undefined];
        if (!lastName) return ['lastName is required', undefined];
        if (!email) return ['email is required', undefined];
        if (!Validators.email.test(email)) return ['email is invalid', undefined];
        if (!password) return ['password is required', undefined];
        if (password.length < 6) return ['password must be at least 6 characters', undefined];

        return [undefined, new RegisterUserDto(firstName, lastName, email, password, role)]
    }

}