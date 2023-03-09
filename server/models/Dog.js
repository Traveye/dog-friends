const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
    dog_name: {
       type: String,
       required: [true, 'Dog name is required'],
    },
    bio: {
       type: String,
       required: [true, 'Bio is required'],
    },
    play_style: {
       type: String,
       required: [true, 'Play style is required'],
    },
    pictures_or_videos: [String],
    dogs_photo: String,
    family_photo: String,
 });
 
 const Dog = model('Dog', dogSchema);
 
 module.exports = Dog;