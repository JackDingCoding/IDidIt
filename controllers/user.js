const CoolItem = require('../models/coolitem');

exports.getMyShowList = (req, res, next) => {
    // let isLoggedIn=req.session.isLoggedIn;
    //console.log(isLoggedIn);
    CoolItem.find({userId: req.session.user})
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

exports.getUserShow = (req, res, next) => {
    // console.log('session user:'+req.session.user._id);
    // console.log('req.session.isLoggedIn:'+req.session.isLoggedIn);
    res.render('coolShow', {
        path: '/guestshow',
        pageTitle: 'User Show',
        isAuthenticated: req.session.isLoggedIn,
    })
}

exports.postUserShow=(req, res, next)=>{
    title=req.body.title;
    imageUrl=req.body.imageUrl;
    description=req.body.description;
    visibility=req.body.visibility;
    // console.log(':'+visibility+':');
    const coolItem = new CoolItem({
        title: title,
        imageUrl: imageUrl,
        description: description,
        author: req.session.user.userName,
        visibility:visibility,
        userId: req.session.user,
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

