import Book from "../models/book.js"


// get book 
class apiFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludeFields = ["page","sort", "limit"]
        excludeFields.forEach(el => delete(queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$' + match)
        console.log({queryObj,queryStr}) 
        this.query.find(JSON.parse(queryStr))
        return this
    }
}

export const getBook = async(req,res) =>{
    try {
        const feature = new apiFeatures(Book.find(),req.query).filtering()
        const book = await feature.query
        //const book = await Book.find()
        res.status(200).json(book)

    } catch (error) {
        res.status(404).json({message : err.message})
    }
}


// add book
export const addBook = async (req,res) => {
    try {
        const {
            title,author,description,price
        } = req.body

        const book = await Book.findOne({ title })
        if (book) return res.status(400).json({ msg: 'Book already Exists.' })
        
        const newBook = new Book({
            title , author , description , price
        })
        
        const savedBook = await newBook.save()

        res.status(201).json({savedBook , status: true});
    
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}
