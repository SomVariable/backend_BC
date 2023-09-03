import { ApiProperty } from "@nestjs/swagger";
import { Area, User } from "@prisma/client";
import { USER_EXAMPLES } from "../../constants/user.constants";

export class GetUserOkResponse {

    @ApiProperty({
        example: USER_EXAMPLES
    })
    data: User

}