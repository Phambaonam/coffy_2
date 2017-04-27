/**
 * Created by doremonsun on 4/25/17.
 */
const express = require('express');
const app = express();
const path = require('path')
app.use("/public", express.static(__dirname + "/public"));

const expressVue = require('express-vue')
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});


app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});

app.get('/', (req, res) => {
    res.render('map');
});