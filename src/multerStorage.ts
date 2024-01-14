import multer from 'multer'
import moment from 'moment'

//multer setup for uploaded file
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${moment().format("DDMMHHmmsss")}-${file.originalname}`)
    }
})

export const upload=multer({storage})