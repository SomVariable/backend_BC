import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";
import { UserResponse } from "src/api/user/dto/user-response.dto";
import { AuthOkResponse } from "./ok.dto";

export class VerificationOkResponse extends AuthOkResponse {
    
    @ApiProperty( { type: UserResponse } )
    user: UserResponse
    
    @ApiProperty({
        type: AUTH_OK.SUCCESS_VERIFICATION,
        default: AUTH_OK.SUCCESS_VERIFICATION,
        enum: AUTH_OK
    })
    message: AUTH_OK.SUCCESS_VERIFICATION;
}