import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';

export const VERIFY_MESSAGE = 'Pls, verify it. Your verification code is:';
export const SING_UP_VERIFY_MESSAGE = (
  data: CreateUserDto,
  verificationCode: string,
) =>
  `Your account was successfully created with email: ${data.email}, password: ${data.email}.\b${VERIFY_MESSAGE} ${verificationCode}`;
//enums
export enum APP_ERRORS {}

export enum BAD_REQUEST_ERRORS {
  FORBIDDEN = 'You do not have access',
}

export enum PROPERTY_LENGTH {
  TITLE = 30,
  SMALL_DESCRIPTION = 100,
  DESCRIPTION = 200,
  TEXT = 400,
}

// types

export type PAGINATION_TYPE = {
  totalCount: number;
  limit: number;
  offset: number;
};


export const UNIQUE_MESSAGE = {
  statusCode: 409,
  message: '[P2002]: Unique constraint failed on the (not available)',
};
