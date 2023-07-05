const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/userData");

require("dotenv").config();

const middleware = async(req,resp,next)=>{
    try{
        const verified = jwt.verify(req.cookies.AuthToken,process.env.JWT_SECRET);
        if(!verified)resp.status(400).json({message:"Not verified token"});
        else{
            req.user = verified;
            next();
        }
    }
    catch{
        resp.status(400).json({message:"No authentication token found"});
    }
    return;
}

router.get('/home',(req,res)=>{
    res.send("hello");
})

router.post("/home/signIn", function(req,resp){
    User.findOne({email:req.body.email}).then(
        async (found)=>{
            if(found){
                resp.status(422).json({
                    message:"Already signed up with this id"
                })
            }
            else {
                let p = "";
                try{
                    p = await bcrypt.hash(req.body.password,10);
                }
                catch{
                    resp.status(500).json({message:"error while hashing password"})
                }
                const user = new User({fname:req.body.fname,lname:req.body.lname,email:req.body.email,password:p});
                user.save().then(()=>{
                    resp.status(200).json({message:"Sign up info saved"});
                }).catch((err)=>{
                    resp.status(500).json({
                        message:"Error while saving sign up data"
                    })
                })
            }
        }
    ).catch((err)=>{
        resp.status(500).json({message:"Server error"});
    })
})

router.post('/home/logIn',(req,resp)=>{
    console.log(req.body);
    User.findOne({email:req.body.email}).then(
        async (found)=>{
            if(found){
                try{
                    let p = await bcrypt.compare(req.body.password,found.password);
                    if(p === true){
                            let options = {expiresIn : '30m'};
                            let scrt = process.env.JWT_SECRET;
                            const signature = jwt.sign(found.toObject(),scrt,options);
                            console.log(signature);
                            resp.cookie("AuthToken",signature,{
                                expires: new Date(Date.now() + 30 * 60 * 1000),
                                httpOnly:true
                            }).status(200).json({token:signature});
                    }
                    else{
                        resp.status(404).json({message:"wrong password"});
                    }
                }
                catch{
                    resp.status(500).json({message:"Error while checking password"});
                }
            }
            else {
                resp.status(422).json({
                    message:"Already signed up with this id"
                })
            }
        }
    ).catch((err)=>{
        resp.status(500).json({message:"Server error"});
    })
})


router.get('/about',middleware,(req,res)=>{
    res.send(req.user);
})

module.exports = router;