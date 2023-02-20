import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true,
        },
        author: {
            type: String,
            required: true,
            max: 50
        },
        description: {
            type: String,
            required: true,
            min: 5,
            max:100,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps : true
    }
)

const Book = mongoose.model("Book" , bookSchema)

export default Book