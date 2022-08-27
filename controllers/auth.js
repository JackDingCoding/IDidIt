const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    //let isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
    //let isLoggedIn=req.session.isLoggedIn;
    //console.log(req.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader("Set-Cookie","loggedIn=true");
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log(err);
                            return res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
        })
        .catch((err)=>{console.log(err)});

}

exports.getSignup = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader("Set-Cookie","loggedIn=true");
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    })
}

exports.postSignup = (req, res, next) => {
    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const userName=req.body.userName;
    User.findOne({
        email: email
    }).then((userDoc) => {
        // console.log('in findOne');
        if (userDoc) {
            // console.log('in findOne => if(userDoc)');
            return res.redirect("/signup");
        }

        return bcrypt.hash(password, 12)
            .then(hashPassword => {
                const user = new User({
                    userName: userName,
                    email: email,
                    password: hashPassword,
                });
                user.save().then(result => {
                    return res.redirect('/login');
                })
            });
    })

        .catch((err) => {

            console.log('in err:' + err);
        })
}

exports.postLogout = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader("Set-Cookie","loggedIn=true");
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}