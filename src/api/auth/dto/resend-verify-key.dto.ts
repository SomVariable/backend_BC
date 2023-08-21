import {  PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-person.dto";


export class ResendVerifyKey extends PickType(CreateUserDto, ["email"]) {  }