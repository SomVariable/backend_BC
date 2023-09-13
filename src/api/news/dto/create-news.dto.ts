import { ApiProperty } from "@nestjs/swagger"
import { ArrayMaxSize, IsArray } from "class-validator"

export class CreateNewsDto {
    
    @ApiProperty()
    @IsArray()
    @ArrayMaxSize(20)
    tags: number[]
    
    @ApiProperty()
    @IsArray()
    @ArrayMaxSize(20)
    users: number[]
}
