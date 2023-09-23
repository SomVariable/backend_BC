import { PickType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends PickType(CreateUserProfileDto, [
  'description',
  'surnameName',
  'firstName',
  'middleName',
  'smallDescription',
]) {}
