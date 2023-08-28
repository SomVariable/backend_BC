export enum APP_ERRORS {
    FORBIDDEN = 'You do not have access'
}

export enum PROPERTY_LENGTH {
    TITLE = 30,
    SMALL_DESCRIPTION = 100,
    DESCRIPTION = 200,

}

export const ID_PARAM = ':id'
export const TRANSLATION_ROUTE = ':translation/:langCode'
export const TRANSLATION_ROUTE_WITH_ID = ':id/translation/:langCode'