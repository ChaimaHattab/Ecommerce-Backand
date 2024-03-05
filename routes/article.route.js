const express=require("express")
const article = require("../models/article")
const router = express.Router()

/**méthode POST */
router.post("/",async(req,res)=>{
    const {reference,designation,prix,marque,qtestock,imageart,scategorieID}=req.body
    try{
        const cat2= new article({reference:reference,designation:designation,prix:prix,
            marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID})
        await cat2.save()
        res.status(200).json(cat2)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*méthode GET*/ 
router.get("/",async(req,res)=>{
    try{
        const cat2= await article.find()
        res.status(200).json(cat2)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*GET by Id*/ 
router.get("/:id",async(req,res)=>{
    try{
        const cat2= await article.findById(req.params.id)
        res.status(200).json(cat2)
    }catch (error){
        res.status(404).json({message:error.message})
    }
})
/*delete*/ 
router.delete("/:id",async(req,res)=>{
    try{
        await article.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"suppression effectuée avec succées"})
    }catch (error) {
        res.status(404).json({message:error.message})
    }
})
/**put */
router.put("/:id",async(req,res)=>{
    try{
        await categorie.findByIdAndUpdate(
            {
                "_id":req.params.id
            },
            {
                $set:req.body,
            },
            {new:true},
        )
        res.status(200).json(cat2)
    }catch (error) {
        res.status(404).json({message:error.message})
    }
})
/**/ 
// afficher la liste des articles par page


/*http://localhost:3001/api/articles//art/pagination?page=2&limit=5*/ 
router.get('/art/pagination', async(req, res) => { 
    const page = req.query.page ||1 // Current page
    const limit = req.query.limit ||5; // Number of items per page
    // Calculez le nombre d'éléments à sauter (offset)
    const offset = (page - 1) * limit;
    try {
    // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
    const articlesTot = await article.countDocuments();
    const articles = await article.find( {}, null, {sort: {'_id': -1}})
    .skip(offset)
    .limit(limit)
    res.status(200).json({articles:articles,tot:articlesTot});
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
module.exports=router