import { Role } from "@prisma/client";

export type jwtType = { email: string, id: number, role: Role, iat: number, exp: number, sessionKey: string }