const mongoose = require('mongoose')

mongoose.model("InterviewScenario", {
    //ScenarioName, Estimated_time, questions(id, order, prerequisite)
    scenario_name: {
        type: String,
        require: true
    },

    estimate_time: {
        type: Number,
        require: false
    },

    questions: [
        {
        question_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "BotQuestion",
            require: true
        },

        order: {
            type: Number,
            require: true
        },

        prerequisite: {
            type: String,
            require: false
        }
    }
]
});
