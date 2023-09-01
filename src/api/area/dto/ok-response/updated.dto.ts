import { ApiProperty } from "@nestjs/swagger";
import { AreaOkResponse } from "./ok.dto";
import { AREA_OK } from "../../constants/area.constants";
import { Area } from "@prisma/client";

export class UpdatedOkResponse extends AreaOkResponse {
    
    @ApiProperty({
        type: AREA_OK.UPDATED,
        default: AREA_OK.UPDATED,
        enum: AREA_OK
    })
    message: AREA_OK.UPDATED;
}