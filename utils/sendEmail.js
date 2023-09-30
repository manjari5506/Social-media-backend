import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";
import Verification from "../models/emailVerification.js";
import { hashString } from "./index.js";

dotenv.config();

const {AUTH_EMAIL, AUTH_PASSWORD ,APP_URL} = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user:AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
})

export const sendVerificationEmail = async(user,res)=>{
    const {_id, email,lastName} = user;
    const token = _id + uuidv4();
    const link = APP_URL + "users/verify/" + _id + "/" + token;

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div
        styles='font-family: Arial, sans-serif; font-size: 20px; coor: #333; backgroung-color: #546' > 
        <h1 style = "color: rgb(8,56,188)"> Please verify your email address</h1>
        <hr>
        <h4>Hi ${lastName},</h4>
        <p>
           Please verify your email address so we can know that it's really you.
           <br>
           <p>This link <br> expires in 1 hour</p></p>
           <br>
           <a href-${link}
           style="color: #fff; padding: 15px; text-decoration: none; backgroung-color: #000">
           Email Address </a>
           </p>
           <div style= "margin-top: 20px;">
           <h5>Best Regards</h5>
           <h5>ShareFun team</h5>
           </div>
           </div>`
    };

    try{
        const hashedToken = await hashString(token);

        const newVerifiedEmail =  await Verification.create({
            userId : _id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt : Date.now() + 3600000,
        });
        if(newVerifiedEmail){
            transporter.sendMail(mailOptions).then(()=>{
                res.status(201).send({
                    success: "PENDING",
                    messege: "Verification email has been sent to your account. Check your email for further instructions",
                });
            })
            .catch((err) =>{
                console.log(err);
                res.status(404).json({messege: "Something went wrong"});
            });
        }
    }catch(error){
        console.log(error);
        res.status(404).json({messege: "Something went wrong"});
    }
};