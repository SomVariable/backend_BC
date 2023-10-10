import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { CreateUserProfileDto } from 'src/api/user-profile/dto/create-user-profile.dto';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

export class GetUserProfileByNameDto  extends QueryPaginationParam{
    @ApiPropertyOptional()
    @Length(1, 90)
    name: string
}
