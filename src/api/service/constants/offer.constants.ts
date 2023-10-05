import { CategoryTranslation, Practice, Prisma, Service } from "@prisma/client"
import { PRACTICE_EXAMPLES } from "src/api/practice/constants/practice.constants"


export type ServiceWithTranslation = Service & {
  CategoryTranslation: CategoryTranslation[]
}

export type ServiceWithFullData = Service & {
  CategoryTranslation: CategoryTranslation[]
  practicesIds: Practice[],

}

export const ServiceIncludeTranslation: Prisma.ServiceInclude = {
  CategoryTranslation: true,
};

export const ServiceIncludePractice: Prisma.ServiceInclude = {
  practicesIds: true
};

export enum Offer_OK {
  OK = "OK",
  CREATED = 'the offer has been successfully established',
  UPDATED = 'the offer has been successfully update',
  DELETED = 'the offer has been successfully deleted',
}

export enum Offer_BAD_REQUEST { 
  UPDATE = 'problem with update data'
}

export enum Offer_NOT_FOUND {
  MISSING_Offer = 'missing offer',
}

export const Offer_EXAMPLES = {
  id: 1,
  created_at: '2023-08-31T13:39:36.767Z',
  updated_at: '2023-08-31T13:39:36.767Z',
};

export const Offer_WITH_TRANSLATION = {
  ...Offer_EXAMPLES,
  CategoryTranslation: [
    {
      id: 1,
      langCode: 'ru',
      categoryTranslationType: 'SERVICE',
      title: 'test',
      text: 'test',
      areaId: 1,
      practiceId: null,
      serviceId: null,
    },
    {
      id: 2,
      langCode: 'en',
      categoryTranslationType: 'SERVICE',
      title: 'test',
      text: 'test',
      areaId: 1,
      practiceId: null,
      serviceId: null,
    },
  ],
}

export const Offer_WITH_FULL = {
  ...Offer_WITH_TRANSLATION,
  practicesIds: [PRACTICE_EXAMPLES, "...n"],
}
