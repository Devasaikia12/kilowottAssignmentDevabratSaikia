import mongoose from 'mongoose'
import config from 'config'

export const connectDB = async()=>{
    try {
        await mongoose.connect(config.get("mongoURI"))
        console.log('Databse is connected')
    } catch (error :any) {
        console.log(error.message)
        process.exit(1)
    }
}

export const disconnectDB = async()=>{
    try {
        mongoose.connection.close()
    } catch (error) {
        console.error('Error while disconnecting DB')
        process.exit(1)
    }
}