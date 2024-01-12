import { hashSync, genSaltSync, compareSync } from "bcryptjs";


export class HashPasswordAdapter {


    static hashPaassword(password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    static comparePassword(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }
}