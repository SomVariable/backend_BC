import { ApiProperty } from '@nestjs/swagger';
import { COUNT_EXAMPLE } from '../../constants/user.constants';

export class GetUsersCountOkResponse {
  @ApiProperty({
    example: COUNT_EXAMPLE,
  })
  count: number;
}
