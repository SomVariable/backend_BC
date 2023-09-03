import { User, UserTranslation } from "@prisma/client";

export type userResponse = {
    user: User;
    message?: string;
    additionalInfo?: object;
}


export type userUnion = UserTranslation & User

export type usersResponse = {
    users: userUnion[];
    totalCountUsers?: number;
    pagination?: number;
    page?: number;
    message?: string;
    additionalInfo?: object;
}