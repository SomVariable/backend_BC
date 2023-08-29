import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreateAreaDto {
    @ApiProperty({ type: [Number] })
    @IsArray()
    practicesIds: number[]
}
