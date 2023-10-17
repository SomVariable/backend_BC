import { Prisma } from '@prisma/client';

export const LIMIT_USERS = 10;

export enum USER_OK {
  OK = 'OK',
  CREATED = 'the user has been successfully established',
  UPDATED = 'the user has been successfully update',
  DELETED = 'the user has been successfully deleted',
}

export enum USER_BAD_REQUEST {}

export enum USER_NOT_FOUND {
  MISSING_USER = 'missing user',
}

export const UserIncludeTranslation: Prisma.UserInclude = {
  UserTranslation: {
    include: { userProfile: true },
  },
};

export const UserIncludeAvatar: Prisma.UserInclude = {
  avatar: {},
};

export const UserIncludeEducation: Prisma.UserInclude = {
  education: {
    include: { educationInfo: true },
  },
};

export const UserIncludeAwards: Prisma.UserInclude = {
  awards: {
    include: { AwardTranslation: true },
  },
};

export const COUNT_EXAMPLE = { count: 3 };

export const USER_EXAMPLES = {
  id: 12,
  role: 'EMPLOYEE',
  email: 'valera_new@gmail.com',
  accountStatus: 'ACTIVE',
};

export const USER_EXAMPLES_WITH_TRANSLATION = {
  id: 12,
  role: 'EMPLOYEE',
  email: 'valera_new@gmail.com',
  accountStatus: 'ACTIVE',
  UserTranslation: [
    {
      id: 4,
      langCode: 'ru',
      firstName: 'Test',
      surnameName: 'Test',
      middleName: 'Test',
      description: 'Test',
      smallDescription: 'Я...',
      status: 'Test',
      position: 'нет',
      userId: 12,
    },
    {
      id: 6,
      langCode: 'en',
      firstName: 'Test',
      surnameName: 'Test',
      middleName: 'Test',
      description: 'Test',
      smallDescription: 'Я...',
      status: 'Test',
      position: 'нет',
      userId: 12,
    },
  ],
};

export const USERS_EXAMPLES_WITH_TRANSLATION = {
  users: [
    {
      accountStatus: 'ACTIVE',
      UserTranslation: [
        {
          id: 4,
          langCode: 'ru',
          firstName: 'Test',
          surnameName: 'Test',
          middleName: 'Test',
          description: 'Test',
          smallDescription: 'Я...',
          status: 'Test',
          position: 'нет',
          userId: 12,
        },
        {
          id: 6,
          langCode: 'en',
          firstName: 'Test',
          surnameName: 'Test',
          middleName: 'Test',
          description: 'Test',
          smallDescription: 'Я...',
          status: 'Test',
          position: 'нет',
          userId: 12,
        },
      ],
      email: 'valera_new@gmail.com',
      id: 12,
      role: 'EMPLOYEE',
    },
  ],
  totalCountUsers: 3,
  limit: 1,
  offset: 2,
};

export const CATEGORY_EXAMPLE = {
  id: 999,
  userId: 888,
};

export const PARTNER_CATEGORY_EXAMPLE = {
  ...CATEGORY_EXAMPLE,
  quote_ru: 'текст',
  quote_en: 'text',
};
