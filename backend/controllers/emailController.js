import { sendAnalysisEmail } from "../utils/emailUtils.js"


export const sendAnalysisEmailController = async (req,res) => {
    const {to,analysisStr} = req.body
    try{
        const resp = await sendAnalysisEmail(to,analysisStr)

        res.status(201).json({message:resp})
      
    }catch(err){
         console.log(err)
         res.status(500).json({message:"Error Sending email"})
    }
}