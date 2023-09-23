export enum AWARD_OK {
  CREATED = 'the area has been successfully established',
  UPDATED = 'the area has been successfully update',
  DELETED = 'the area has been successfully deleted',
  INFO_CREATED = 'the area-info has been successfully established',
  INFO_UPDATED = 'the area-info has been successfully update',
}

export enum AWARD_BAD_REQUEST {}

export enum AWARD_NOT_FOUND {
  MISSING_AWARD = 'missing award',
  MISSING_AWARD_INFO = 'missing award-info',
}

export const AWARD_EXAMPLES = {
  id: 1,
  userId: 10,
};

export const AWARD_INFO_EXAMPLE = {
  id: 1,
  langCode: 'ru',
  title: 'тест',
  awardId: 1,
};

export const AWARD_WITH_TRANSLATION = {
  id: 1,
  userId: 10,
  AwardTranslation: [
    {
      id: 1,
      langCode: 'ru',
      title: 'тест',
      awardId: 1,
    },
    {
      id: 2,
      langCode: 'en',
      title: 'test',
      awardId: 1,
    },
  ],
};
