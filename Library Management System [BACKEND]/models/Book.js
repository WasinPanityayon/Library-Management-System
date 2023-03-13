const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bookSchema = new mongoose.Schema(
    {
        bookno: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        usercheckout: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

bookSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Book', bookSchema)