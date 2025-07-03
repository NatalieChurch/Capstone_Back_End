import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { createNewUser, getUser, getUserByID } from "../db/queries/users.js"
import { verifyToken } from "../app.js"

const router = express.Router()
export default router

//POST /users/login
router.route("/login").post(async(req, res, next)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Missing username or password")
    }

    const userProfile = await getUser({email})

    if (!userProfile){
        return res.status(401).send("Incorrect login credentials")
    }

    const isMatch = await bcrypt.compare(password, userProfile.password)

    if (!isMatch) {
        return res.status(401).send("Incorrect login credentials")
    }

    const token = jwt.sign(
        {id: userProfile.id, username: userProfile.username},
        process.env.JWT_SECRET
    );
    res.status(200).json(token)
})

//POST /users/register
router.route("/register").post(async(req, res, next)=> {
    const {username, password} = req.body

    if (!username || !password){
        return res.status(400)("Missing username or password")
    }

    const newUser = await createNewUser({username, password})
    const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)

    res.status(200).json(token)
})

//GET /users/me
router.route("/me").get(verifyToken, async(req, res, next)=> {
    const userInfo = await getUserByID({ id: req.user.id})
    res.status(200).json(userInfo)
    })
