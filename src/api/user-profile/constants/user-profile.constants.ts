
export enum USER_PROFILE_OK {
    OK = "OK"
}

export enum USER_PROFILE_BAD_REQUEST {

}

export enum USER_PROFILE_NOT_FOUND {
    MISSING_USER_PROFILE = 'missing user-profile'
}

export type _23 = (typeof USER_PROFILE_OK) & (typeof USER_PROFILE_NOT_FOUND)

export const USER_PROFILE_EXAMPLES = {"id":10,"langCode":"en","firstName":"name","surnameName":"surnameName","middleName":"middle","description":"description","smallDescription":"sm_d","status":"status","position":"pos","userId":30}

export const USER_PROFILE_EXAMPLES_WITH_TRANSLATION = ""