import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { USER_NOT_FOUND } from "../constants/user.constants";

export class UserNotFoundErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: USER_NOT_FOUND,
        enum: USER_NOT_FOUND
    })
    message: string;
  }