export const LOCAL = 'local'

export enum AUTH_OK {
    SIGN_UP = 'User with email  was created, please verify your account',
    SIGN_IN = 'A verification code was sent to your email',
    SUCCESS_VERIFICATION = 'user was verified',
    REFRESH_TOKEN = 'token was refreshed',
    LOGOUT = 'session was blocked',
    PASSWORD_CHANGED = 'password was changed',
    SEND_VERIFICATION_KEY = 'verify-key was sand to your email',
    FIRST_USER = 'admin was created'
}

export enum AUTH_BAD_REQUEST {
    WRONG_DATA = 'Wrong email or password',
    WRONG_PASSWORD = 'wrong password',
    BLOCKED_SESSION = 'session is blocked',
    OVERSTAYED = 'Sorry, but you overstayed your verification key. Please reauthenticate',
    WRONG_KEY = 'Wrong verification key',
    FIRST_USER = 'there\'s already an admin on the system'
}

export enum AUTH_NOT_FOUND {
    MISSING_USER = 'missing user',
}