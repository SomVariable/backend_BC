import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { USER_PROFILE_BAD_REQUEST } from "../constants/user-profile.constants";


export class UserBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: USER_PROFILE_BAD_REQUEST,
        enum: USER_PROFILE_BAD_REQUEST
    })
    message: string;
  }