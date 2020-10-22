let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');


let bookController = require('../controllers/book');

// helper function fr guard purposes

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// GET Route for Book LIst page - Read Operation

router.get('/',bookController.displayBookList);

// GET Route for displaying Add page - Create Operation

router.get('/add', requireAuth,bookController.displayAddPage);


// POST Route for processing Add page - Create Operation

router.post('/add', requireAuth,bookController.processAddPage);

// GET Route for displaying Edit page - Update Operation

router.get('/edit/:id', requireAuth,bookController.displayEditPage);

// POST Route for processing Edit page - UPdate Operation

router.post('/edit/:id', requireAuth,bookController.processEditPage);

// GET to perform deletion - Delete Operation

router.get('/delete/:id', requireAuth,bookController.performDelete);

module.exports = router;