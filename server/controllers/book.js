let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let jwt  = require('jsonwebtoken');

//create a reference to the model

let Book = require('../models/book');

module.exports.displayBookList = (req,res,next) =>{
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
           // console.log(BookList);
            //1
           //res.render('book/list', {title: 'Books',BookList: bookList,displayName: req.user ? req.user.displayName:''});
            res.json(bookList);
        }
    });
}

module.exports.displayAddPage = (req,res,next) => {
    //res.render('book/add', {title: 'Add Book',displayName: req.user ? req.user.displayName:''});
    //2
    res.json({success: true, msg:'Successfully Displayed Add Page'});
}

module.exports.processAddPage =(req,res,next) => {
    let newBook = Book({
        "name": req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price

    });

    Book.create(newBook,(err,Book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //res.redirect('/book-list');
            //3
            res.json({success: true, msg:'Succesfulled added new book!'});
        }
    });
    
}

module.exports.displayEditPage = (req,res,next) => {
    let id=req.params.id;
    
    Book.findById(id,(err, bookToEdit) => {

        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //shoe the edit view
            //res.render('book/edit',{title:'Edit Book',book: bookToEdit,displayName: req.user ? req.user.displayName:''});
            //4
            res.json({success: true, msg:'Successfully Displayed Book to Edit', book: bookToEdit});
        }
    });
    
}

module.exports.processEditPage = (req,res,next) => {
    let id=req.params.id;

    let updatedBook=Book({
        "_id":id,
        "name": req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price


    });
    
    Book.updateOne({_id:id},updatedBook, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            //res.redirect('/book-list');
            //5
            res.json({success: true, msg: 'Successfully Edited Book', book: updatedBook});
        }
    });
}

module.exports.performDelete = (req,res,next) => {
    let id= req.params.id;

    Book.deleteOne({_id:id},(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //res.redirect('/book-list');
            //6
            res.json({success: true, msg:'Succesfully Deleted'});
        }
    });
    
}