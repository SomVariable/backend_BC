import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { CreateUserProfileDto } from 'src/api/user-profile/dto/create-user-profile.dto';

export class GetUserProfileByNameDto {
    @ApiPropertyOptional()
    @Length(1, 30)
    surnameName?: string

    @ApiPropertyOptional()
    @Length(1, 30)
    firstName?: string

    @ApiPropertyOptional()
    @Length(1, 30)
    middleName?: string
}
