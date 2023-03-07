const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    breed:{
        type: String,
        required: true,
        trim: true
    },
    bio:{
        type: String,
        //maxLength: 300
        trim: true
    },
    playstyle:{
        type: String,
        required: true,
        //maxLength: 300
        trim: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

const Dog = model('Dog', dogSchema);

module.exports = Dog