import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto, FieldsAgentDto, RegisterUserUseCase } from '../../../domain';

export class UserController {
    constructor(
        private readonly repository: AuthRepository
    ) { }

    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error) // Winston, Console, etc
        return res.status(500).json({ error: "Internal Server Error" })
    }

    public login(req: Request, res: Response) {
        res.json(req.body)
    }

    public register = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        const [errorFieldsAgent, fieldsAgentDto] = FieldsAgentDto.create(req.body);

        if (error) return res.status(400).json({ error })
        if (errorFieldsAgent) return res.status(400).json({ errorFieldsAgent })
        if (!registerUserDto || !fieldsAgentDto) return res.status(400).json({ error: "Invalid body" })

        new RegisterUserUseCase(this.repository)
            .execute({ registerUserDto, fieldsAgentDto })
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }
}