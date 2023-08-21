import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";
import { AuthOkResponse } from "./ok.dto";

export class ChangePasswordOkResponse extends AuthOkResponse {
    
    @ApiProperty({
        type: AUTH_OK.PASSWORD_CHANGED,
        default: AUTH_OK.PASSWORD_CHANGED,
        enum: AUTH_OK
    })
    message: AUTH_OK.PASSWORD_CHANGED;
}