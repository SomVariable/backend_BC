import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK, JWT_EXAMPLE } from "../../constants/auth.constants";
import { UserResponse } from "src/api/user/dto/user-response.dto";
import { AuthOkResponse } from "./ok.dto";

export class VerificationOkResponse extends AuthOkResponse {
    
    @ApiProperty( { example: JWT_EXAMPLE } )
    data: any
    
    @ApiProperty({
        type: AUTH_OK.SUCCESS_VERIFICATION,
        default: AUTH_OK.SUCCESS_VERIFICATION,
        enum: AUTH_OK
    })
    message: AUTH_OK.SUCCESS_VERIFICATION;
}