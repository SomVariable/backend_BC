import { User, UserTranslation } from "@prisma/client";

export type userResponse = {
    user: User;
    message?: string;
    additionalInfo?: object;
}


export type userUnion = UserTranslation & User
export type UserReturnType = Pick<User, "email"> & Pick<
UserTranslation, 
"firstName" | "position" | "surnameName" | "middleName" | "status" | "smallDescription"
>

export type usersResponse = {
    users: userUnion | userUnion[];
    totalCountUsers?: number;
    pagination?: number;
    page?: number;
    message?: string;
    additionalInfo?: object;
}