import { Area, CategoryTranslation, Practice, Prisma } from '@prisma/client';

export type AreaWithTranslation = Area & {
  CategoryTranslation: CategoryTranslation[];
};

export type AreaWithFullData = Area & {
  CategoryTranslation: CategoryTranslation[];
  practicesIds: Practice[];
};

export const AreaIncludeTranslation: Prisma.AreaInclude = {
  CategoryTranslation: true,
};

export const AreaIncludePractices: Prisma.AreaInclude = {
  practicesIds: true,
};

export enum AREA_OK {
  OK = 'OK',
  CREATED = 'the area has been successfully established',
  UPDATED = 'the area has been successfully update',
  DELETED = 'the area has been successfully deleted',
}

export enum AREA_BAD_REQUEST {}

export enum AREA_NOT_FOUND {
  MISSING_AREA = 'missing area',
}

export const AREA_EXAMPLES = {
  id: 1,
  created_at: '2023-08-31T13:39:36.767Z',
  updated_at: '2023-08-31T13:39:36.767Z',
};

export const AREA_WITH_TRANSLATION = {
  id: 1,
  created_at: '2023-08-31T13:39:36.767Z',
  updated_at: '2023-08-31T13:39:36.767Z',
  CategoryTranslation: [
    {
      id: 1,
      langCode: 'ru',
      categoryTranslationType: 'AREA',
      title: 'test',
      text: 'test',
      areaId: 1,
      practiceId: null,
      serviceId: null,
    },
    {
      id: 2,
      langCode: 'en',
      categoryTranslationType: 'AREA',
      title: 'test',
      text: 'test',
      areaId: 1,
      practiceId: null,
      serviceId: null,
    },
  ],
};
