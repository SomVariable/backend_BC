import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "../../auth/dto/create-person.dto";
import { Role, AccountStatus, User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger"; 


export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    login?: string;
    
    @ApiProperty()
    @IsOptional()
    verification_key?: string
    
    @ApiProperty()
    @IsOptional()
    verification_timestamp?: string
    
    @ApiProperty()
    @IsOptional()
    role?: Role
    
    @ApiProperty()
    @IsOptional()
    accountStatus?: AccountStatus
    
    @ApiProperty()
    @IsOptional()
    isConfirmedChangePassword?: boolean
}