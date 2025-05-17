const db = require("../database/firestore")
const Joi = require("joi")
const isUserAlreadyRegistered = require("../helper/isUserAlreadyRegistered")


async function createUser(req, res){
    const schema = Joi.object({
        username: Joi.string().required().external(async (value, helpers) => {
            const userAlreadyExists = await isUserAlreadyRegistered(value);

            if(userAlreadyExists){
                throw new Joi.ValidationError('Custom error message', [{ message: 'Username already exists' }], value);
            }

            return value;
        }
        ).messages({
            "string.empty": "Username is required",
            "any.required": "Username is required"
        }),
        name: Joi.string().required().messages({
            "string.empty": "Name is required",
            "any.required": "Name is required"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Email is not valid",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required"
        }),
        confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Password not match",
            "any.required": "Confirm password is required"
        }),
    });

    try{
        const value = await schema.validateAsync(req.body, { abortEarly: false });
        const userDb = db.collection('users');
        const newUser = userDb.doc(value.username);

        await newUser.set({
            name: value.name,
            email: value.email,
            password: await hashPassword(value.password)
        });

        return res.status(200).send({
            message: "Registration success",
            data:{
                username: req.body.username,
                name: req.body.name,
                email: req.body.email
            }
        });
    } catch(error){
        if(error.isJoi){
            return res.status(400).send({
                message: error.details.map((detail) => detail.message).join(", ") || "Validation error"
            });
        }

        return res.status(500).send({ message: error.message })
    }
}

async function loginUser(req, res){
    
}

async function updateUser(req, res){

}

async function deleteUser(req, res){

}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
}