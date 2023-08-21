import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UpdateSessionDto } from "./update-session.dto";

export class UpdateVerifyDto extends PickType(UpdateSessionDto, ["verificationKey", "verificationTimestamp"]) {
    
}