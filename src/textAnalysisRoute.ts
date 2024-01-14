import { PrismaClient } from '@prisma/client';
import express, {Router, Request,Response,NextFunction } from 'express'
import fs from 'fs'

export const textAnalysisRoute:Router=express.Router()

const prismaClient=new PrismaClient()

textAnalysisRoute.post('/textAnalysisInit',async (req:Request,res:Response,next:NextFunction)=>{
    try{
    if(!req.body.fileId || !req.body.operations?.length) return res.send({message:"fileId and operations is required in request body !"})

    const file:any=await prismaClient.files.findFirst({where:{fileId:req.body.fileId},select:{availabeWords:true}})
    if(!file) res.send({message:"please check if fileId is correct"})

        const splitedWords:string[]=file?.availabeWords
        const uniqueWords= [...new Set(splitedWords)]
        const topWords= uniqueWords
        .map(u=>({word:u,frequency:splitedWords.filter(a=>a==u).length}))
        .sort((a,b)=>((a.frequency>b.frequency)?-1:1))
        .map(a=>a.word)

        const analysedText:any={
            "countWords":splitedWords.length,
            "countUniqueWords":uniqueWords.length,
            "findTopKWords":topWords.slice(0,req.body.k),
        }
        
        const result:any={
            fileId:req.body.fileId,
            taskId:`TSK${req.body.fileId?.split("-")[1].substr(0,3)}${Math.floor(Math.random()*1000)}`.toUpperCase()
        }

        for(let op of req.body.operations){
            if(op==="findTopKWords" && !req.body.k) return res.send({message:`for findTopKWords operation 'k' feild required in request body !`})
            result[op]=analysedText[op]
        }

        await prismaClient.tasks.create({data:result})

        res.send({taskId:result.taskId})
    }catch(error){
        console.log("errored with ",error)
    }
    
})

textAnalysisRoute.post('/textAnalysisRetrieve',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.body.taskId ) return res.send({message:"taskId is required in request body !"})
        const result:any=await prismaClient.tasks.findFirst({where:{taskId:req.body.taskId}})
        delete result["id"];
        delete result["taskId"];
        delete result["fileId"];
        res.send(result)
    }catch(error){
    console.log("errored with ",error)
    }
})