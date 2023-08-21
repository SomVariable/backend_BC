import { ApiProperty } from "@nestjs/swagger"
import { Length } from "class-validator"

export class CreateUserProfileDto {
    @ApiProperty()
    @Length(2)
    langCode: string
    
    @ApiProperty()
    @Length(3, 30)
    firstName?: string

    @ApiProperty()
    @Length(3, 30)
    surnameName?: string

    @ApiProperty()
    @Length(3, 30)
    middleName?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    @Length(3, 200)
    smallDescription?: string

    @ApiProperty()
    status?: string

    @ApiProperty()
    @Length(3, 20)
    position?: string
}
