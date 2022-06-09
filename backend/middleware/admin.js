// before giving access i have to check whether the particular user is admin or not
const express = require('express');

module.exports = function(req, res, next){
    if(!req.user.isAdmin)
        return res.status(403).send("Access Denied");
    
    next();
}