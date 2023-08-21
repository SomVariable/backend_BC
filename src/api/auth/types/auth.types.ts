import { User } from "@prisma/client";

export type authUserReturnType = {
    person: User
    message?: string
}


export type authVerifyReturnType = {
    jwtToken: string,
    refreshToken: string,
    message?: string
}