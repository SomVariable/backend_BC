import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";
import { CreateTagInfoDto } from "./create-tag-info";

export class UpdateTagInfoDto extends PartialType(CreateTagInfoDto) {
}