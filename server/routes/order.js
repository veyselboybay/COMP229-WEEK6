let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let orderController = require('../controllers/order');

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Get OrderList page -- READ Operation

router.get('/',orderController.displayOrderList);

// POST Route for processing the Add page

router.post('/add',orderController.processAddPage);

// POST Request - Update the database with data from the Edit Order Page

router.post('/edit/:id', passport.authenticate('jwt',{session: false}),orderController.processEditPage);

// GET request - perform the delete order action

router.get('/delete/:id', passport.authenticate('jwt',{session: false}), orderController.performDelete);

module.exports = router;