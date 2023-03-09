const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// const isPassword = function(password){
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;
//     return regex.test(password);
// }

const userSchema = new Schema({
    //? unique username can be validated on client side
    username:{
        type: String,
        required: [true,'Username is required'],
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required:[ true,'Password is required'],
        trim: true,
        minLength:[ 6, 'Password must be 6 characters or more'],
        validate: [regex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character']
    },
    location:{
        type: String,
        //maxLength: 300
        trim: true
    },
    dogReference:[
        { type : Schema.Types.String,
            ref : 'Dog'},
            
        ],
    // media:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 
    // }]
});

userSchema.plugin(uniqueValidator, {message: 'Username must be unique'});

const User = model('User', userSchema);

module.exports = User;