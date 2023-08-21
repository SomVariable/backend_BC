import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACCESS_JWT_STRATEGY } from "../constants/jwt-helper.constants";


@Injectable()
export class AccessJwtAuthGuard extends AuthGuard( ACCESS_JWT_STRATEGY ){
    
}