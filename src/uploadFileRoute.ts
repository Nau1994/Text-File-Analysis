import express, {Router, Request,Response,NextFunction } from 'express'
import moment from 'moment-timezone'
const mime = require('mime-types');
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { upload } from './multerStorage'
export const uploadFileRoute:Router=express.Router()

const prismaClient=new PrismaClient()

uploadFileRoute.post('/uploadFile',upload.single("TextFile"),async (req:any,res)=>{
    
    try{
        // Check if the file is a text file based on its content type or extension
        const isTextFile = mime.lookup(req.file.originalname) === 'text/plain';
        if (!isTextFile) {return res.send({message:"Only text file allowed"})}

        //file reading and storing metadata in database
        fs.readFile(req.file?.path,'utf-8',async (err,data)=>{
            if(err) res.send({message:"error in file reading",error:err})
        
            const fileDataInLine=data.replace(/\r?\n/g," ")
            const splitedWords=fileDataInLine.split(" ").filter(a=>(a!="" && a!=" "))
        
            const result:any={
                "fileId":req.file?.filename.replace('.txt',""),
                "fileName":req.file?.filename,
                "filePath":req.file?.path,
                "availabeWords":splitedWords,
                "uploadTime":moment().toISOString()
            }
            
            //saving to database
            const uploadedFile=await prismaClient.files.create({
                data:result
            })
        
            res.send({
                fileId:result.fileId ,
                "message":"file uploaded"
            })
        })

    }catch(error){
    console.log("errored with ",error)
    }
})