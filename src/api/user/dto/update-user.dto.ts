import { IsOptional } from 'class-validator';
import { CreateUserDto } from '../../auth/dto/create-person.dto';
import { Role, AccountStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  role?: Role;

  @ApiProperty()
  @IsOptional()
  accountStatus?: AccountStatus;

  @ApiProperty()
  @IsOptional()
  isConfirmedChangePassword?: boolean;
}
