import {Router ,Request} from "express";
import { createUser, deleteUser, disableUser, listUsers } from '../controller/admin.controller'
import {authChecker} from '../middleware/auth.passport'
import { schemaValidator } from "../middleware/validation.middleware";
import { createUserSchema } from "../schema/user.schema";
import { authorize } from "../middleware/authorize";
const routes = Router()

routes.post('/users',authChecker,authorize,schemaValidator(createUserSchema), createUser)
routes.delete('/user/:id',authChecker,authorize, deleteUser)
routes.patch('/user/:id',authChecker,authorize, disableUser)
routes.get('/users/',authChecker,authorize, listUsers)

export default routes