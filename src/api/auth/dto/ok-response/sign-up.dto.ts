import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";
import { UserResponse } from "src/api/user/dto/user-response.dto";
import { AuthOkResponse } from "./ok.dto";

export class SignUpOkResponse extends AuthOkResponse{
    
    @ApiProperty( { type: UserResponse } )
    user: UserResponse
    
    @ApiProperty({
        type: AUTH_OK.SIGN_UP,
        default: AUTH_OK.SIGN_UP,
        enum: AUTH_OK
    })
    message: AUTH_OK.SIGN_UP;
}