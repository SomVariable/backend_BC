import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class UserResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: Role;
}