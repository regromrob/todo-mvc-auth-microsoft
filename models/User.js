const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  microsoftId: { //store a microsoft id
    type: String,
    required: true,
  },
  displayName: { //optional- store display name
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema) //to create a user document in database
