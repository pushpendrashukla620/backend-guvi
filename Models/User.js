const mongoose=require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
    }, 
    email : {
        type : String ,
        required : true,
    },
    password : {
        type : String ,
        required : true
    },
    surname : {
        type : String ,
        // required : true ,
    }, 
    user_name : {
        type : String ,
        // required : true ,
        unique:true
    }, 
    avatar_url : {
        type : String ,
        
    }, 
    phone : {
        type : Number ,
        // required : true ,
    },
    address1 : {
        type : String ,
        // required : true ,
    },
    address2 : {
        type : String ,
        // required : true ,
    }, 
    pincode : {
        type : Number ,
        // required : true ,
    },
    country : {
        type : String ,
        // required : true ,
        default:"India",
    },
    gender: {
        type : String ,
        
    },
})

const User = mongoose.model("User" ,userSchema);

module.exports = {
    User
}