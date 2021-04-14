const mongoose = require('mongoose')

//export function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, { //unique string to personal db; its the link that mongo gives that is pushed in env file(which always goes to gitignore; no one can have it)
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`) //tell us we're connected & which database
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
