export const dateTemplate = /^\d{4}-\d{2}-\d{2}$/

export enum EDUCATION_OK {

}

export enum EDUCATION_BAD_REQUEST {
    WRONG_DATA_FORMAT = 'Invalid date format. Use YYYY-MM-DD.',
    WRONG_DATA = 'Invalid date value. Year should be between 1900 and 9999, month between 1 and 12, and day between 1 and 31.'
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