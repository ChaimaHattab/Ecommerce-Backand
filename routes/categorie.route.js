const express=require("express")
const categorie = require("../models/categorie")
const router=express.Router()

/**méthode Post */
router.post("/",async(req,res)=>{//post pour faire l'insertion dans la Bd
    const {nomcategorie,imagecategorie}=req.body
 try {
   const cat1=new categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie}) 
   await cat1.save()
   res.status(200).json(cat1)
 } catch (error) {
    res.status(404).json({message:error.message})
 }
})
 /*méthode Get*/
router.get("/",async(req,res)=>{
    try{
    const cat = await categorie.find()
    res.status(200).json(cat)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*Get by id*/ 
router.get("/:id",async(req,res)=>{
    try{
          const cat=await categorie.findById(req.params.id)
          res.status(200).json(cat)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*delete*/
router.delete("/:id",async(req,res)=>{
    try{
   await categorie.findByIdAndDelete(req.params.id)
   res.status(200).json({message:"suppression effectuée avec succées"})
    }catch(error){
        res.status(404).json({message:error.message})
    }
})
/*put*/ 
router.put("/:id",async(req,res)=>{
    try{
        await categorie.findByIdAndUpdate(
            {
                "_id":req.params.id
            },
            {
                $set:req.body,     
            },
            {new: true},
        )
            res.status(200).json(cat)
        
    }catch(error){
        res.status(404).json({message:error.message})
    }
})

module.exports=router