export class FieldsAgentDto {

    private constructor(
        public readonly experience: number,
        public readonly specialty: string,
        public readonly location: string,
        public readonly rating: number,
        public readonly contactNumber: string
    ) { }

    static create(object: { [key: string]: any }): [string?, FieldsAgentDto?] {

        const { experience, specialty, location, rating, contactNumber } = object;

        if (!experience) return ["experience is required"];
        if (!specialty) return ["specialty is required"];
        if (!location) return ["location is required"];
        if (!rating) return ["rating is required"];

        return [undefined, new FieldsAgentDto(experience, specialty, location, rating, contactNumber)]

    }
}