const User = require('../models/userModels')
const bcrypt = require('bcryptjs')

exports.signUp = async (req,res) => {
    
    const {username , password} = req.body
    try {
        const hashPassword = await bcrypt.hash(password , 12)
        const newUser = await User.create({
            username ,
            password : hashPassword
        })
        req.session.user = newUser
        res.status(201).json({
            status : 'success' ,
            data : {
                user : newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status : 'failed'
        })
    }
}

exports.logIn = async (req,res) => {
    
    const {username , password} = req.body
    try {
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({
                status: 'failed' ,
                message : 'There is no user with this username'
            })
        }
        const isCorrect = await bcrypt.compare(password , user.password)
        if (isCorrect){
            req.session.user = user
            return res.status(200).json({
                status : 'succes' ,
                message : 'Succesfully logged in'
            })
        }else{
            res.status(400).json({
                status : 'failed' ,
                message : 'You provided your password wrong'
            })
        }
    } catch (e) {
        res.status(404).json({
            status : 'failed'
        })
    }
}