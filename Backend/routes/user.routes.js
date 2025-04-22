const express = require('express');
const router = express.Router();
const { body } = require('express-validator') ;
const usercontroller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min : 3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

   
],

usercontroller.registerUser
)

// router.post('/register', [
//     body('email').isEmail().withMessage('Invalid Email'),
//     body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
// ],
//     usercontroller.registerUser
// )
//login route
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

],
usercontroller.loginUser)

//prfoile route

router.get('/profile', authMiddleware.authUser, usercontroller.getUserProfile);

//logout user

router.get('/logout', authMiddleware.authUser, usercontroller.logoutUser);
module.exports = router;