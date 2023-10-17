import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_EXAMPLE } from '../../constants/user.constants';
import { EmployeeProfile } from '@prisma/client';

export class CreateEmployeeOkResponse {
  @ApiProperty({
    example: CATEGORY_EXAMPLE,
  })
  data: EmployeeProfile;
}
