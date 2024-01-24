const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testDataIphone:{
        emailId : "kovey86773@grassdev.com",
        password : "NoPeaking>--<",
        productName : "IPHONE 13 PRO",
        country : "India"
    }
});