const { Schema, model } = require('mongoose');

const isPassword = function(password){
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;
    return regex.test(password);
}

const userSchema = new Schema({
    username:{
        type: String,
        required: [true,'Username is required'],
        trim: true,
        unique: [true, 'Username must be unique']
    },
    password:{
        type: String,
        required:[ true,'Password is required'],
        trim: true,
        min:[ 6, 'Password must be 6 characters or more'],
        validate: [isPassword, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character']
    },
    location:{
        type: String,
        //maxLength: 300
        trim: true
    },
    dogReference:[
           { type : Schema.Types.ObjectId,
            ref : 'Dog'}
        ],
    // media:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 
    // }]
});

const User = model('User', userSchema);

module.exports = User;