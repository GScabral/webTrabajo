const { Router } = require('express');

const createServicio=require("../controller/servicio/newService")
const allService=require("../controller/servicio/getAllService")

const router = Router();

router.post("/newService",async(req,res)=>{
    try{

        const newService = await createServicio(req.body)

        if(newService && newService.error){
            res.status(404).json({error:newService.message})
        }else{
            res.status(200).json(newService)
        }
        
    }catch(error){
        res.status(500).json({error:"error en el servidor"})
    }
})

router.get("/allService",async(req,res)=>{
    try{
        const listService=await allService();
        res.status(200).json(listService)
    }catch(error){
        res.status(500).json({error:"error en el servidor"})
    }
})


module.exports=  router;