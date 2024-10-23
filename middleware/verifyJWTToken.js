const jwt=require("jsonwebtoken");
const dotEnv=require("dotenv");

dotEnv.config() 

const SCRECT_KEY=process.env.SCRECT_KEY

const authication= async (request,response,next)=>{
    try{
        const authHeader=request.headers["authorization"] 
        let jwtToken; 
        if (authHeader!==undefined){
            jwtToken=authHeader.split(" ")[1] 
        }
        if (jwtToken===undefined){
            response.status(401).json({error_msg:`Invalid JWT token`})
        }else{
            
            await jwt.verify(jwtToken,SCRECT_KEY,async (error,payload)=>{
                if(error){
                    response.status(401).json({error_msg:`Invalid JWT token`})
                }else{
                    request.id=payload.id;
                    next()
                }
            }

            )
        }
    }
    catch(error){
        response.status(401).json({error_msg:`Authentication failed ${error}`})
    }
}


module.exports=authication;