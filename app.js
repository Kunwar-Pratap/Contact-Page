const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/contactUs01', { useNewUrlParser: true });

const port = process.env.PORT || 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    concern: String
});

const contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/contact.html'));
});

app.post('/contact.html', function (req, res) {
    const myData = new contact(req.body);
    myData.save().then(() => {
        res.send("Data has been submitted successfully");
    }).catch(() => {
        res.status(400).send("Data was not submitted successfully");
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);