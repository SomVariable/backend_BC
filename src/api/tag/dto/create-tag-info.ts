import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateTagInfoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tag: string
}