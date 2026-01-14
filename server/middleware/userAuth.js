import jwt from "jsonwebtoken";

const userAuth = async (req,res,next)=>{
     const token = req.cookies.token;

     console.log(token);
     console.log(req.cookies);


      if(!token){
          return res.status(401).json({success:false,message:'Unauthorized. 1'})
      }

      try{
          const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET);
          if(tokenDecoded.id){
             req.userId = tokenDecoded.id;
          }else{
              return res.status(401).json({success:false,message:'Unauthorized'})
          }
          next();

         
      }catch(error){
          return res.status(401).json({success:false,message:error.message})
      }
    

}

export default userAuth;
