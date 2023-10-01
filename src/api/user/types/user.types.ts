import { User, UserTranslation } from '@prisma/client';

export type userResponse = {
  user: UserWithTranslations;
  message?: string;
  additionalInfo?: object;
};

type UserWithTranslations = User & {
  UserTranslation: UserTranslation[];
};

export type usersResponse = {
  users: UserWithTranslations[];
  totalCount?: number;
  offset?: number;
  limit?: number;
  message?: string;
  additionalInfo?: object;
};
