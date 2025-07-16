const z = require( "zod")

const Signup = z.object({
    username: z.string({required_error:"Username is Required"}).trim().min(3,{message:"Username must be at least 3 character"}).max(255,{message:"Username must not be more than 255 characters"}),

    email : z.string({required_error:"email must be required"}).trim().email({message:"Invalid Email Address"}).min(3,{message:"email must be at least 3 character"}).max(255,{message:"email must not be more than 255 characters"}),

    password: z.string({required_error:"Password must be required"}).min(7,{message:"Password must be at least 7 character"}).max(18,{message:"Password must not be more than 18 characters"}),
})

const login = z.object({

    email : z.string({required_error:"email must be required"}).trim().email({message:"Invalid Email Address"}).min(3,{message:"email must be at least 3 character"}).max(255,{message:"email must not be more than 255 characters"}),

    password: z.string({required_error:"Password must be required"}).min(7,{message:"Password must be at least 7 character"}).max(18,{message:"Password must not be more than 18 characters"}),
})

const addContact = z.object({
    email: z.string({required_error:"Email is Required"}).trim().min(3,{message:"email must be at least 3 character"}).max(255,{message:"email must not be more than 255 characters"}),
    contactInfo: z.array(z.object({
        Contactname: z.string({required_error:"name must be required"}).trim().min(3,{message:"name must be at least 3 character"}).max(255,{message:"name must not be more than 255 characters"}),
        Contactemail: z.string({required_error:"email must be required"}).trim().email({message:"Invalid Email Address"}).min(3,{message:"email must be at least 3 character"}).max(255,{message:"email must not be more than 255 characters"}),
        Contactphone: z.string({required_error:"phone must be required"}).trim().min(10,{message:"phone must be at least 10 character"}).max(15,{message:"phone must not be more than 15 characters"}),
    }))
})

module.exports = {Signup,login,addContact}