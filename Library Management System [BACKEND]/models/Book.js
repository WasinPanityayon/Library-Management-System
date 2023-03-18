const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bookSchema = new mongoose.Schema(
    {
        imagebook: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: false
        },
        isbn: {
            type: String,
            required: false
        }
    }
)

bookSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 100
})


module.exports = mongoose.model('Book', bookSchema)