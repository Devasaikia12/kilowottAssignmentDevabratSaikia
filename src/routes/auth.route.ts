import {Router ,Request} from "express";
import { signUpAdmin,signIn } from "../controller/auth.controller";
import { schemaValidator } from "../middleware/validation.middleware";
import { signUpSchema,signInSchema } from "../schema/user.schema";

const routes = Router()

routes.post('/signup', schemaValidator(signUpSchema), signUpAdmin)
routes.post('/signin',schemaValidator(signInSchema),signIn)

export default routes