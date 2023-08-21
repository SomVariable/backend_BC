import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";
import { UserResponse } from "src/api/user/dto/user-response.dto";
import { AuthOkResponse } from "./ok.dto";

export class FirstUserOkResponse extends AuthOkResponse{
    
    @ApiProperty( { type: UserResponse } )
    user: UserResponse
    
    @ApiProperty({
        type: AUTH_OK.FIRST_USER,
        default: AUTH_OK.FIRST_USER,
        enum: AUTH_OK
    })
    message: AUTH_OK.FIRST_USER;
}