const express=require("express")
const scategorie = require("../models/scategorie")
const categorie = require("../models/categorie")
const router = express.Router()

/*méthode Post*/ 
router.post("/",async(req,res)=>{
    const {nomscategorie,imagescat,categorieID}=req.body
    try{
        const cat2 = new scategorie({nomscategorie:nomscategorie,imagescat:imagescat,categorieID:categorieID})
        await cat2.save()
        res.status(200).json(cat2)
    }catch (error) {
        res.status(404).json({message:error.message})
    }
})
/*méthode Get*/ 
router.get("/",async(req,res)=>{
    try{
    const cat = await scategorie.find()
    res.status(200).json(cat)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/**Get by id */
router.get("/:id",async(req,res)=>{
    try{
        const cat= await categorie.findById(req.params.id)
        res.status(200).json(cat3)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*delete*/ 
router.delete("/:id",async(req,res)=>{
    try{
        await scategorie.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"suppression effectuée avec succées"})
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*put*/
router.put("/:id",async(req,res)=>{
    try{
        await scategorie.findByIdAndUpdate(
            {
                "_id":req.params.id
            },
            {
                $set:req.body,
            },
            {new: true},
        )
        res.status(200).json(cat3)
    }catch (error){
        res.status(404).json({message:error.message})
    }
}) 
module.exports=router