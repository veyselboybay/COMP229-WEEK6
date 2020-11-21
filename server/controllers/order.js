let express = require('express');
let router = express.Router();

let Order = require('../models/order');

let Store = require('../models/store');
let Cart = Store.Cart;
let Book = Store.Book;

module.exports.displayOrderList = (req,res,next) =>{
    Order.find((err,orderList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(orderList);
        }
    });
}

module.exports.processAddPage = (req, res, next) => {
    // Serialize the cart data
    let cart = new Cart();
    for(let line of req.body.cart.lines)
    {
        let book = new Book(
            line.book._id,
            line.book.name,
            line.book.author,
            line.book.description,
            line.book.price
        );
        let quantity = line.quantity;
        cart.lines.push({book, quantity});
        
    }
    cart.itemCount = req.body.cart.itemCount;
    cart.cartPrice = req.body.cart.cartPrice;

    let newOrder = Order({
        "name":req.body.name,
        "address":req.body.address,
        "city":req.body.city,
        "province":req.body.province,
        "postalCode":req.body.postalCode,
        "country":req.body.country,
        "shipped":req.body.shipped,
        "cart":cart
    });

    Order.create(newOrder, (err, Order) => {
        if(err)
        {
            
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg:'Successfully added new order'});
        }
    });


}

module.exports.processEditPage = (req, res, next) => {
    let id= req.params.id;

  
    let cart = new Cart();
    for(let line of req.body.cart.lines)
    {
        let book = new Book(
            line.book._id,
            line.book.name,
            line.book.author,
            line.book.description,
            line.book.price
        );
        let quantity = line.quantity;
        cart.lines.push({book, quantity});
    }
    cart.itemCount = req.body.cart.itemCount;
    cart.cartPrice = req.body.cart.cartPrice;

    // Update teh order object
    let updatedOrder = Order({
        "_id":id,
        "name":req.body.name,
        "address":req.body.address,
        "city":req.body.city,
        "province":req.body.province,
        "postalCode":req.body.postalCode,
        "country":req.body.country,
        "shipped":req.body.shipped,
        "cart":cart
    });

    Order.updateOne({_id: id}, updatedOrder, (err) => {
        if(err)
        {
            console.log(err);
            console.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Order', order: updatedOrder});
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Order.deleteOne({_id:id}, (err) => {
        if(err)
        {
            console.log(err);
            console.end(err);

        }
        else
        {
            res.json({success: true, msg: 'Successfully Deleted'});
        }
    })
}