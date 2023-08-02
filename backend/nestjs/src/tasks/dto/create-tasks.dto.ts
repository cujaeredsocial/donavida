// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNotEmpty } from "class-validator";

export class CreateTasksDTO{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}