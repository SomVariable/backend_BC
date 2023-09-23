import { IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-person.dto';

export class VerifyUser extends PickType(CreateUserDto, ['email']) {
  @ApiProperty()
  @IsString()
  verifyCode: string;
}
