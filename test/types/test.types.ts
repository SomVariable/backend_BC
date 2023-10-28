import { Session } from 'inspector';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { FirstUserOkResponse } from 'src/api/auth/dto/ok-response/first-user.dto';
import { SignUpOkResponse } from 'src/api/auth/dto/ok-response/sign-up.dto';
import { VerificationOkResponse } from 'src/api/auth/dto/ok-response/verification.dto';

export type fullSignUpType = {
  responseVerifyBody: VerificationOkResponse;
  sessionRes: Session;
  responseBody: SignUpOkResponse;
  dto: CreateUserDto;
};

export type signUpAdminType = {
  sessionRes: Session;
  responseBody: FirstUserOkResponse;
  dto: CreateUserDto;
};
