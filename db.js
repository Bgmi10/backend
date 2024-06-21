const mongoose = require('mongoose')

const connectDb = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/',{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
    }
    catch{
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}


module.exports = connectDb