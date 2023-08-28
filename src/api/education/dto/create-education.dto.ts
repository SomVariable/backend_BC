import { ApiProperty } from "@nestjs/swagger"
import { IsDataURI, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator"
import { dateTemplate } from "../constants/education.constants"

export class CreateEducationDto {
    @ApiProperty({
        example: "yyyy-mm-dd",
    })
    @IsNotEmpty()
    @Matches(dateTemplate)
    studyYear: string

    @ApiProperty({
        example: "yyyy-mm-dd",
    })
    @IsNotEmpty()
    @Matches(dateTemplate)
    graduationYear: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    specialty: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    qualification: string
}
