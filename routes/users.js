const express = require("express")
const router = express.Router()
const {find,findUserById,insertUser,updateUserById,getAllUsers} = require("../services/UserService")
router.get("/",async (req,res)=>{
    try {
        const users = await getAllUsers()
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.post("/addUser",async (req,res)=>{
    try {
        const user = {
            username:req.body.username,
            email:req.body.email,
            user_pass:req.body.user_pass,
            isadmin:req.body.isadmin,
            dob:req.body.dob,
            balance:req.body.balance,
            adressid:req.body.adressid
        }
        await insertUser(user)
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
router.post("/update",async (req,res)=>{
    try {
        const {id,...rest} = req.body
        const isUpdated = await updateUserById(id,rest)
        if(isUpdated){
            return res.status(200).json("Update Sucessfull!");
        }
        return res.status(400).send({msg:"User could not be updated!",status:400,hint:"Check your query"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Internal Server Error",status:500,error:error});
    }
})




module.exports=router;