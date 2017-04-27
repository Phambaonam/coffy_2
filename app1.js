const express = require('express');
const app = express();
const path = require('path');
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
app.get('/map',(req,res)=>{
    let scope = {
        vue: {
            head: {
                title: 'Chi Tiet',
                meta : [
                    {script : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAsB1OF-sOPmmMd9bwLpJfJfrdumJ_A6dI&callback=initMap'},
                    {script:'https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js'}
                ]
            },
        }
    };
    res.render('map',scope)
});