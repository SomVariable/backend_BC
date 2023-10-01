import { Session } from "inspector"
import { VerificationOkResponse } from "src/api/auth/dto/ok-response/verification.dto"

export type fullSignUpType = {
    responseVerifyBody: VerificationOkResponse, 
    sessionRes: Session, 
    responseBody, 
    dto
  } 