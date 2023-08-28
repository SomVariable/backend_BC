import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateEducationInfoDto{
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    educationId: number
    
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    title: string
    
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    university: string
}
