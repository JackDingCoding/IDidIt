const CoolItem = require('../models/coolitem');

exports.getMain = (req, res, next) => {
    // let isLoggedIn=req.session.isLoggedIn;
    //console.log(isLoggedIn);
    CoolItem.find({visibility:"public"})
    .then((coolItems)=>{
        //console.log(coolItems);
        res.render('main', {
            path: '/',
            pageTitle: 'I DID IT!',
            coolItems: coolItems,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    
}

exports.guetShowGet = (req, res, next) => {

    res.render('coolShow', {
        path: '/guestshow',
        pageTitle: 'Guest Show',
        isAuthenticated: false,
    })
}

exports.guetShowPost = (req, res, next) => {
    //console.log('guestShowPost');
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const coolItem = new CoolItem({
        title: title,
        imageUrl: imageUrl,
        description: description,
        author: 'Anonymous',
        visibility:'public',
        userId: null,
    });
    coolItem
    .save()
    .then(result=>{
        //console.log('Created Product');
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    });
    
}