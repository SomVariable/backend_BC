import { ApiProperty } from "@nestjs/swagger";
import { Area, User } from "@prisma/client";
import { COUNT_EXAMPLE, USER_EXAMPLES } from "../../constants/user.constants";

export class GetUsersCountOkResponse {

    @ApiProperty({
        example: COUNT_EXAMPLE
    })
    count: number

}