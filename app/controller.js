const fs = require("fs");
const SECRET_COOKIE = process.env.SECRET_COOKIE || "this_is_testing_cookie"

const flag1 = fs.readFileSync("/flag1")
const flag2 = fs.readFileSync("/flag2")


function LoginController(req,res) {
    try {
        const username = req.body.username
        const password = req.body.password
        if (username !== "admin" || password !== Math.random().toString()) {
            res.status(401).type("text/html").send("Login Failed")
        } else {
            res.cookie("user",SECRET_COOKIE)
            res.redirect("/flag1")
        }
    } catch (__) {}
}

function CheckInternalController(req,res) {
    res.sendFile("check.html",{root:"static"})

}

function CheckController(req,res) {
    let checkcode = req.body.checkcode?req.body.checkcode:1234;
    console.log(req.body)
    if(checkcode.length === 16){
        try{
            checkcode = checkcode.toLowerCase()
            if(checkcode !== "aGr5AtSp55dRacer"){
                res.status(403).json({"msg":"Invalid Checkcode1:" + checkcode})
            }
        }catch (__) {}
        res.status(200).type("text/html").json({"msg":"You Got Another Part Of Flag: " + flag2.toString().trim()})
    }else{
        res.status(403).type("text/html").json({"msg":"Invalid Checkcode2:" + checkcode})
    }
}

function Flag1Controller(req,res){
    try {
        if(req.cookies.user === SECRET_COOKIE){
            res.setHeader("This_Is_The_Flag1",flag1.toString().trim())
            res.setHeader("This_Is_The_Flag2",flag2.toString().trim())
            res.status(200).type("text/html").send("Login success. Welcome,admin!")
        }
        if(req.cookies.user === "admin") {
            res.setHeader("This_Is_The_Flag1", flag1.toString().trim())
            res.status(200).type("text/html").send("You Got One Part Of Flag! Try To Get Another Part of Flag!")
        }else{
            res.status(401).type("text/html").send("Unauthorized")
        }
    }catch (__) {}
}



module.exports = {
    LoginController,
    CheckInternalController,
    Flag1Controller,
    CheckController
}