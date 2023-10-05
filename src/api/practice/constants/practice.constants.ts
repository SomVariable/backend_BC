import { Area, CategoryTranslation, Practice, Prisma, Service } from "@prisma/client"


export type PracticeWithTranslation = Practice & {
  CategoryTranslation: CategoryTranslation[]
}

export type PracticeWithFullData = Practice & {
  CategoryTranslation: CategoryTranslation[]
  areasIds: Area[],
  servicesIds: Service[]
}

export const PracticeIncludeTranslation: Prisma.PracticeInclude = {
  CategoryTranslation: true,
};

export const PracticeIncludePractices: Prisma.PracticeInclude = {
  areasIds: true,
  servicesIds: true
};

export enum PRACTICE_OK {
  OK = 'OK',
  CREATED = 'the practice has been successfully established',
  UPDATED = 'the practice has been successfully update',
  DELETED = 'the practice has been successfully deleted',
}

export enum PRACTICE_BAD_REQUEST {}

export enum PRACTICE_NOT_FOUND {
  MISSING_PRACTICE = 'missing practice',
}

export const PRACTICE_EXAMPLES = {
  id: 1,
  created_at: '2023-08-31T13:39:36.767Z',
  updated_at: '2023-08-31T13:39:36.767Z',
};

export const PRACTICE_WITH_TRANSLATION = {
  data: {
    id: 1,
    created_at: '2023-08-31T13:39:36.767Z',
    updated_at: '2023-08-31T13:39:36.767Z',
    CategoryTranslation: [
      {
        id: 1,
        langCode: 'ru',
        categoryTranslationType: 'PRACTICE',
        title: 'test',
        text: 'test',
        areaId: 1,
        practiceId: null,
        serviceId: null,
      },
      {
        id: 2,
        langCode: 'en',
        categoryTranslationType: 'PRACTICE',
        title: 'test',
        text: 'test',
        areaId: 1,
        practiceId: null,
        serviceId: null,
      },
    ],
  },
};
