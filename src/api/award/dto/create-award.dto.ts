import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PROPERTY_LENGTH } from "src/common/constants/app.constants";

export class CreateAwardDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(PROPERTY_LENGTH.TITLE)
    title: string;
}
