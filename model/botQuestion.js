const mongoose = require('mongoose')

mongoose.model("BotQuestion", {
    //Category, Body, Estimated_time
    category:{
        type: String,
        require: true
    },

    body:{
        type: String,
        require: true
    },
    
    estimate_time:{
        type: Number,
        require: false
    }
});