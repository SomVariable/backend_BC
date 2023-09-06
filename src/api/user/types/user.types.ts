import { User, UserTranslation } from "@prisma/client";

export type userResponse = {
    user: UserWithTranslations;
    message?: string;
    additionalInfo?: object;
}


type UserWithTranslations = User & {
    UserTranslation: UserTranslation[];
  };

export type usersResponse = {
    users: UserWithTranslations[];
    totalCountUsers?: number;
    offset?: number;
    limit?: number;
    message?: string;
    additionalInfo?: object;
}