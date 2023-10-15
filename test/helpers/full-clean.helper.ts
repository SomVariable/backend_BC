import { CreateUserDto } from "src/api/auth/dto/create-person.dto"
import { requestWithAdminPermission } from "./auth.helper"
import { clearContentItem, clearUser, dropUsers } from "./user.helper"
import { clearCategory } from "./category.helper"
import { UniqueNumberGenerator } from "./generrateUniqueNumber.helper"

export const fullClean = async (app) => {
    const dto: CreateUserDto = {
        email: `super-adnm${UniqueNumberGenerator.generateRandomNumber()}@gmail.com`,
        password: "QWE123!@#qweQWE"
    }
    const reqWithAdminPermission = requestWithAdminPermission(app, null, dto)
    await reqWithAdminPermission(clearContentItem)
    await reqWithAdminPermission(dropUsers)
    await reqWithAdminPermission(clearCategory)
    
}