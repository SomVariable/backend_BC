import { BAD_REQUEST_ERRORS } from "src/common/constants/app.constants"

export const dateTemplate = /^\d{4}-\d{2}-\d{2}$/

export enum EDUCATION_OK {
    OK = "OK",
    CREATED = "education has been created",
    UPDATED = "education has been updated",
    DELETED = "education has been deleted",
    INFO_CREATED = "education-information has been created",
    INFO_UPDATED = "education-information has been updated"
}

export enum EDUCATION_BAD_REQUEST {
    WRONG_DATA_FORMAT = 'Invalid date format. Use YYYY-MM-DD.',
    WRONG_DATA = 'Invalid date value. Year should be between 1900 and 9999, month between 1 and 12, and day between 1 and 31.'
}

export const EDUCATION_BAD_REQUEST_WITH_APP_ERRORS = {
    ...EDUCATION_BAD_REQUEST, 
    ...BAD_REQUEST_ERRORS
}

export enum EDUCATION_NOT_FOUND {
    MISSING_EDUCATION = 'missing education',
    MISSING_EDUCATION_INFO = 'missing education-info',
}

export enum EDUCATION_LEVELS_EN {
    SPECIALIZATION = 'specialization',
    BACHELOR = 'bachelor\'s degree',
    MASTER = 'master\'s degree',
    POSTGRADUATE = 'postgraduate course',
    DOCTORAL = 'doctoral studies',
    PROFESSIONAL_RETRAINING = 'professional retraining',
    ADVANCED_TRAINING = 'advanced training'
} 

export enum EDUCATION_LEVELS_RU {
    SPECIALIZATION = 'специалитет',
    BACHELOR = 'бакалавриат',
    MASTER = 'магистратура',
    POSTGRADUATE = 'аспирантура',
    DOCTORAL = 'докторантура',
    PROFESSIONAL_RETRAINING = 'профессиональная переподготовка',
    ADVANCED_TRAINING = 'повышение квалификации'
} 

export const EDUCATION_EXAMPLES = {
    "id":3,
    "studyYear":"2023-10-10",
    "graduationYear":"2023-10-10",
    "specialty":"specialty",
    "qualification":"qualification",
    "userId":30,
    "educationInfo":[
       
    ]
 }

 export const EDUCATION_INFO_EXAMPLES = {}