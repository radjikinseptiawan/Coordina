import { extname } from "path"

export const PROFILE_EDIT_CONFIG = {
            destination: "./media/profile",
            filename: (req, file, callback)=>{
                const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
                const ext = extname(file.originalname)
                callback(null, `${suffix}${ext}`) 
            }
        }