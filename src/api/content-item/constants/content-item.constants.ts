import { Prisma } from "@prisma/client"

export const ContentItemIncludeTranslation: Prisma.ContentItemInclude = {
    ContentItemTranslation: {
        include: {contentItem: true}
    }
}