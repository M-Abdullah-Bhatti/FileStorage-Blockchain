const mongoose = require('mongoose')

const hashSchema = mongoose.Schema({

        hashvalue: {
            type: String,
            required: true,
        },
        privatekey: {
            type: String,
            required : true
          },

    },
)

module.exports = mongoose.model('Hash', hashSchema)