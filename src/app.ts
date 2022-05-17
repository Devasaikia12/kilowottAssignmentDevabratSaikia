import express from 'express'
import config from 'config'
import passport from 'passport'
import authRoutes from './routes/auth.route'
import adminRoutes from './routes/admin.route'
import userRoutes from './routes/user.route'
import { connectDB } from './uttils/db'
import authPassport from './middleware/auth.passport'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(passport.initialize())
authPassport(passport)
app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
const port = config.get<number>("port")

app.listen(port,async()=>{
    console.log(`App is running on http://localhost:${port}`);
    await connectDB();
})