const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
    category: String,
    content: String,
    title: String,
    author: String,
    created: Date,
    image: [{data: Buffer, contentType: String}],
    view: {type: Number, default: 0},
    status: {type: Boolean, default: false},
    comment: [{
        name: String,
        content: String,
        written: Date,
        reply: [{
            name: String,
            content: String,
            written: Date
        }]
    }]
    },
    {versionKey: false})

let posts = mongoose.model('post', postSchema);

module.exports = posts;