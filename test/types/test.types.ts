import { Session } from "inspector"
import { CreateUserDto } from "src/api/auth/dto/create-person.dto"
import { FirstUserOkResponse } from "src/api/auth/dto/ok-response/first-user.dto"
import { VerificationOkResponse } from "src/api/auth/dto/ok-response/verification.dto"

export type fullSignUpType = {
  responseVerifyBody: VerificationOkResponse,
  sessionRes: Session,
  responseBody,
  dto
}


export type signUpAdminType = {
  sessionRes: Session,
  responseBody: FirstUserOkResponse,
  dto: CreateUserDto
} 