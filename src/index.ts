import express from 'express'
import { textAnalysisRoute } from './textAnalysisRoute'
import { uploadFileRoute } from './uploadFileRoute'


async function createServer() {
    
const app=express()

app.use(express.json())

//uploadFileRoute middleware for file upload
app.use(uploadFileRoute)

//textAnalysisRoute middleware for file analysis
app.use(textAnalysisRoute)

app.use('/',(req,res)=>{
    res.send({
        "message":"isalive endpoint running"
    })
})

app.listen(8080,()=>{
    console.log(`DATABASE_URL: ${process.env["DATABASE_URL"]}`)
    console.log("server running on 8080")
})
    
}

createServer()