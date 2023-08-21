import { ApiProperty } from "@nestjs/swagger";
import { AUTH_OK } from "../../constants/auth.constants";

export class AuthOkResponse {
    @ApiProperty({
        type: AUTH_OK,
        enum: AUTH_OK
    })

    message: AUTH_OK;
}