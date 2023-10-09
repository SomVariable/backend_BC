// types 

import { ContentItem, Prisma, Tag, TagTranslation } from "@prisma/client"
import { PAGINATION_TYPE } from "src/common/constants/app.constants";

type TagTranslationType = {
  TagTranslation: TagTranslation[]
}

type ContentItemType = {
  contentItem: ContentItem
}

export type TagWithTranslation = Tag & TagTranslationType
export type TagWithContentItem = Tag & ContentItemType
export type TagWithFullData = Tag & TagTranslationType & ContentItemType

export const TagIncludeTranslation: Prisma.TagInclude = {
  TagTranslation: true,
};

export const TagIncludeContentItem: Prisma.TagInclude = {
  contentItem: true
};

// utils

const isUpperCase = (letter: string) => {
  if(typeof letter !== "string"){
    return false
  }
  
  if(letter.length !== 1){
    return false
  }

  return letter === letter.toUpperCase()
}

export const strToTag = (str: string) => {
  const strWithoutStartEndSpaces = str.trim()
  const strWithoutSpaces = strWithoutStartEndSpaces.replace(' ', '_')
  const strWithoutSpecChar = strWithoutSpaces.replace(/[^\w\s]/gi, '')

  return strWithoutSpecChar.split('').map((letter, index: number) => {
    if(index === 0){
      return letter === "#"? letter: `#${letter.toLowerCase()}`
    }
    else if (isUpperCase(letter)) {
      return `_${letter.toLowerCase()}`
    } else {
      return letter
    }
  }).join('')
}

//constants


export enum TAG_OK {
  OK = 'OK',
}

export enum TAG_BAD_REQUEST { }

export enum TAG_NOT_FOUND {
  MISSING_TAG = 'missing tag',
  MISSING_TAG_INFO = 'missing tag-info',
}

export const TAG_EXAMPLES = {
  id: 999,
  practiceId: 13,
  newsId: 14
};

export const TAG_EXAMPLES_WITH_TRANSLATION = {
  id: 999,
  langCode: "ru",
  tag: "tag",
  tagId: 998
}
