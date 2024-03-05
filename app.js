const express=require("express")//nadiw 3ala bibliothétique express bch nist3mlo express
const mongoose =require("mongoose")
const dotenv=require("dotenv")//exporrt
/********* */
/*pour categorie*/ 
const categorieRouter =require("./routes/categorie.route")
/****************************************************** */
/*pour scategorie*/
const scategorieRouter = require("./routes/scategorie.route")
/*********** **********************************************/
/**pour article */
const articleRouter = require("./routes/article.route")



const app=express()//t3mil objet min  express
app.use(express.json())
//bch n3rfo li ahna nist3o fi json yrj3lna resultat fi json
//config dotenv
dotenv.config()

app.get("/",(req,res)=>{
    res.end("bienvenue dans notre site");
})
//connexion a la base de donnée 
//mongoose.connect(process.env.DATABASE)//mangoose howa li connectiini 3ala bse de donnée
//itha connexion ala base de donnéé sarit =>mt3mil hta chy ili matconnecté
/**************connexion a la base de donnée*********************************************************** */
mongoose.connect(process.env.DATABASECLOUD)//yilzimna nkouno nkono connecté 
.then(()=>console.log("connexion a la base de donnée réussie"))
//errour a la base de donnée
.catch(err=>{console.log("error de connexion a la base de donnée",err)
//o5rig mouch lazim tkamill
process.exit()
})

/************************************************************************************* */
/**pour categories */
app.use("/api/categories",categorieRouter)
/************************************** */
/**pour scategories */
app.use("/api/scategories",scategorieRouter)
/********************************************** */
/**pour article */
app.use("/api/articles",articleRouter)

app.listen(process.env.PORT)//variable port li mawjouda fi fichier .env fi process
console.log(`serveur is listen on port ${process.env.PORT}`)//altGr+espace:lcode '



//1. Il faut ajouter dans le serveur app.js à la fin du code.
module.exports = app;