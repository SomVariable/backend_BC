import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";
import { AuthOkResponse } from "./ok.dto";

export class LogoutOkResponse extends AuthOkResponse {
    
    @ApiProperty({
        type: AUTH_OK.LOGOUT,
        default: AUTH_OK.LOGOUT,
        enum: AUTH_OK
    })
    message: AUTH_OK.LOGOUT;
}