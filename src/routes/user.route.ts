import {Router ,Request} from "express";
import { changePassword,updateUserProfile } from '../controller/user.controller'
import {authChecker} from '../middleware/auth.passport'
import { schemaValidator } from "../middleware/validation.middleware";
import { changePasswordSchema,userProfileSchema } from "../schema/user.schema";
import { upload } from "../middleware/fileUpload";
const routes = Router()

routes.post('/change_pasword',authChecker,schemaValidator(changePasswordSchema), changePassword)
routes.put('/me',authChecker,upload.single("profilePic"), updateUserProfile)

export default routes