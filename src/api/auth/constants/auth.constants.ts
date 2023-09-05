export const LOCAL = 'local'

export enum AUTH_OK {
    OK = 'Ok',
    SIGN_UP = 'User with email  was created, please verify your account',
    SIGN_IN = 'A verification code was sent to your email',
    SUCCESS_VERIFICATION = 'user was verified',
    REFRESH_TOKEN = 'token was refreshed',
    LOGOUT = 'session was blocked',
    PASSWORD_CHANGED = 'password was changed',
    SEND_VERIFICATION_KEY = 'verify-key was sent to your email',
    FIRST_USER = 'admin was created'
}

export enum AUTH_BAD_REQUEST {
    WRONG_DATA = 'Wrong email or password',
    BLOCKED_SESSION = 'session is blocked',
    OVERSTAYED = 'Sorry, but you overstayed your verification key. Please reauthenticate',
    WRONG_KEY = 'Wrong verification key',
    FIRST_USER = 'there\'s already an admin on the system'
}

export enum AUTH_NOT_FOUND {
    MISSING_USER = 'missing user',
}

export const SIGN_UP_EXAMPLE = {
    "id": 28,
    "email": "new_user_1601@gmail.com",
    "role": "EMPLOYEE",
    "accountStatus": "PENDING"
}

export const JWT_EXAMPLE = {
    "jwtToken": "token",
    "refreshToken": "token-2"
}

export const LOGOUT_EXAMPLE = {
    "id": "28:desktop",
    "verificationKey": "919245",
    "verificationTimestamp": "1693821398537",
    "status": "BLOCKED"
}
