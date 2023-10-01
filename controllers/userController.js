import mongoose from "mongoose";
import Verification from "../models/emailVerification.js";

export const verifyEmail = async(req,res) =>{
    const {userId, token} = req.params;
    try{
        const data = await Verification.findOne({userId});

        if(data){}
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }


}