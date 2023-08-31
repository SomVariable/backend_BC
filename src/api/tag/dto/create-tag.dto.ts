import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateTagDto {
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    practiceId: number
}