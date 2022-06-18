const express = require("express")
const router = express.Router()
const {getAllHouses} = require("../services/HouseService")
router.get("/",async (req,res)=>{
    try {
        const houses = await getAllHouses()
        return res.status(200).json(houses)
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Internal Server Error!",status:500})
    }
})

router.post("/addHouse",(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({msg:"Internal Server Error",status:500,error:error})
    }
})

router.post("/update",(req,res)=>{

})

module.exports = router; 