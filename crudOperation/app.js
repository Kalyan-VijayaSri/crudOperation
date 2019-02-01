const express = require('express')
const app = express()
const port = 4004
const bodyParser = require("body-parser");
var Model = require('./model/userSchema');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * view engine 
 */
app.set('view engine', 'ejs')

/**
 * getting config
 */
require("./config/config");

/**
 * Getting information using GET API  
*/

app.get('/getData', (req, res) => {
    Model.find(function (err, obj) {
        if (err) throw err;
        else
            console.log(obj);
        res.render('info', { names: obj });

    });
});

/**
 * Adding firstname and lastname using POST API
 */
app.post('/addData', (req, res) => {

    var a = new Model({ firstname: req.body.firstname, lastname: req.body.lastname });
    a.save(function (err, obj) {
        if (err) throw err;
        else
            console.log(obj);
        res.send(obj);
    });
});

/**
 * Editing firstname with given data using PUT API
 */
app.put('/putData', (req, res) => {

    var oldn = { firstname: req.body.oldname };
    var newn = { $set: { firstname: req.body.newname } };
    console.log(oldn);
    console.log(newn);
    if (req.body.oldname==req.body.newname){
        //console.log("Already existed replace with new name");
        res.json({ success: false, message: 'Name already exists no need to update.' });
    }
    else {
    Model.updateOne(oldn, newn, function (err, obj) {
        if (err) throw err;
        else {
            console.log(obj);
            console.log("one document updated");
        }
    });
    }
});


/**
 * Deleting firstname using DELETE API
 */
app.delete('/deleteData', (req, res) => {

    var oldn = { firstname: req.body.firstname };
    Model.deleteOne(oldn, function (err, obj) {
        if (err) throw err;
        else {
            console.log(obj);
            console.log("one document Deleted");
        }
    });

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))