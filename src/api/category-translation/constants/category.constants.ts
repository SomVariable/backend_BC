export const TRANSLATION_ROUTE_WITH_CATEGORY_TYPE = ':categoryTranslationType/translation/:langCode'
export const mapToIdObject = (id: number) => ( { id } )


export enum CATEGORY_INFO_OK {
    CREATED = 'the category info has been successfully established',
    UPDATED = 'the category info has been successfully update'
}

export enum CATEGORY_INFO_BAD_REQUEST {

}

export enum CATEGORY_INFO_NOT_FOUND {
    MISSING_CATEGORY_INFO= 'missing category',
}

export const CATEGORY_INFO_EXAMPLES = {
    "data":{"id":16,"langCode":"ru",
    "categoryTranslationType": "AREA",
    "title":"SDF",
    "text":"SDF",
    "areaId":4,
    "relatedId":4,
    "practiceId":null,
    "serviceId":null,
}}