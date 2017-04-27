/**
 * Created by msi on 08/04/2017.
 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const promise = require('./pgp');
const path = require('path');
const async = require('async');
const db = promise.db;

app.use("/public", express.static(__dirname + "/public"));

const expressVue = require('express-vue')
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});

//GET home page
app.get('/', (req, res) => {
    db.any("SELECT id_location, name, address, octime, rate, la" +
        "t, long, id_type, id_district FROM coffy.location ORDER BY random() LIMIT 30")
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let scope = {
                    data: {
                        data: result,
                    }
                    , vue: {
                        head: {
                            title: 'Home',
                            meta:[
                                // script
                                {script:'/public/js/vue.min.js'},
                                {sript:'/public/js/jquery-3.2.0.min.js'},
                                {script:'/public/js/vue.min.js'},
                                {script:'/public/js/bootstrap.min.js'},
                                {script:'/public/js/script.js'},

                                // style
                                {style:'/public/css/reset.css',type: 'text/css', rel: 'stylesheet'},
                                {style:'/public/css/bootstrap.min.css', rel: 'stylesheet'},
                                {style:'/public/css/font-awesome.min.css', rel: 'stylesheet'},
                                {style:'/public/css/style.css', rel: 'stylesheet'},
                                {style:'/public/css/responsive.css',type: 'text/css', rel: 'stylesheet'}
                            ]
                        },
                        components: ['mynav','myfooter','mymaincontent']
                    }
                };
                res.render('index',scope);
            });
        })
        .catch(error => {
            console.log(error);
        });


});

/* app.get('/find/near', (req, res) => {
    // let uLong = req.body['long'],
    //     uLat = req.body['lat'],
    //     uType = req.body['type'],
    //     uR = req.body['r'];
    let uLong = parseFloat(req.query.long),
        uLat = parseFloat(req.query.lat),
        uType = parseFloat(req.query.type),
        uR = parseFloat(req.query.r);
    console.log(uR, uType, uLong, uLat);

    //let db = promise.db;
    db.any(
        //"SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location WHERE ST_DWithin(geog, ST_Point(${uLong}, ${uLat})::geography, ${uR}) AND id_type = ${uType};",
        "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
        "CROSS JOIN (SELECT ST_Point(${uLong}, ${uLat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${uR}) " +
        "AND id_type = ${uType} ORDER BY ST_Distance(geog, ref_geog) LIMIT 30;",
        {
            uLong: uLong,
            uLat: uLat,
            uR: uR,
            uType: uType
        })
        .then(data => {
            //console.log(data);
            async.mapSeries(data, merge2, (err, result) => {
                let scope = {
                    data: {
                        data: result,
                    }
                    , vue: {
                        head: {
                            title: 'Near me',
                            meta:[
                                // script
                                {script:'/public/js/vue.min.js'},
                                {sript:'/public/js/jquery-3.2.0.min.js'},
                                {script:'/public/js/vue.min.js'},
                                {script:'/public/js/bootstrap.min.js'},
                                {script:'/public/js/script.js'},

                                // style
                                {style:'/public/css/reset.css',type: 'text/css', rel: 'stylesheet'},
                                {style:'/public/css/bootstrap.min.css', rel: 'stylesheet'},
                                {style:'/public/css/font-awesome.min.css', rel: 'stylesheet'},
                                {style:'/public/css/style.css', rel: 'stylesheet'},
                                {style:'/public/css/responsive.css',type: 'text/css', rel: 'stylesheet'}
                            ]
                        },
                        components: ['mynav','myfooter','mymaincontent']
                    }
                };
                res.render('index',scope);
            });
            // res.json(data);
            // success;
        })
        .catch(error => {
            console.log(error);
            // error;
        });
}); */

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
//GET detail page
app.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    //let db = promise.db;
    console.log(id);
    db.one("SELECT * FROM coffy.location WHERE id_location = ${id}", {id: id})
        .then(data => {
            let test = [data];
            async.map(test, merge2, (err, result) => {
                // console.log(result[0]);
                let scope = {
                    data: {
                        data: result[0]
                    }
                    , vue: {
                        head: {
                            title: 'Chi Tiet',
                            meta : [
                                {script : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAsB1OF-sOPmmMd9bwLpJfJfrdumJ_A6dI'},
                                // script
                                {script:'/public/js/vue.min.js'},
                                // {sript:'/public/js/jquery-3.2.0.min.js'},
                                {script:'/public/js/vue.min.js'},
                                // {script:'/public/js/bootstrap.min.js'},
                                // {script:'/public/js/script.js'},

                                // style
                                {style:'/public/css/reset.css',type: 'text/css', rel: 'stylesheet'},
                                {style:'/public/css/bootstrap.min.css', rel: 'stylesheet'},
                                {style:'/public/css/font-awesome.min.css', rel: 'stylesheet'},
                                {style:'/public/css/style.css', rel: 'stylesheet'},
                                {style:'/public/css/responsive.css',type: 'text/css', rel: 'stylesheet'}
                            ]
                        },
                        components: ['mynav','myfooter','mymaincontent']
                    }
                };
                res.render('detail',scope);
            });
        })
        .catch(error => {
            console.log(error);
            // error;
        });

});

app.post('/find/loc', (req, res) => {
    // let uLong = req.body['long'],
    //     uLat = req.body['lat'],
    //     uType = req.body['type'],
    //     uR = req.body['r'];
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);
    console.log(uR, uType, uLong, uLat);

    //let db = promise.db;
    db.any(
        //"SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location WHERE ST_DWithin(geog, ST_Point(${uLong}, ${uLat})::geography, ${uR}) AND id_type = ${uType};",
        "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
        "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
        "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
        {
            Long: uLong,
            Lat: uLat,
            R: uR,
            Type: uType
        })
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let scope = {
                    data: {
                        data: result,
                    }
                    , vue: {
                        head: {
                            title: 'Home',
                            meta:[
                                // script
                                {script:'/public/js/vue.min.js'},
                                {sript:'/public/js/jquery-3.2.0.min.js'},
                                {script:'/public/js/vue.min.js'},
                                {script:'/public/js/bootstrap.min.js'},
                                {script:'/public/js/script.js'},

                                // style
                                {style:'/public/css/reset.css',type: 'text/css', rel: 'stylesheet'},
                                {style:'/public/css/bootstrap.min.css', rel: 'stylesheet'},
                                {style:'/public/css/font-awesome.min.css', rel: 'stylesheet'},
                                {style:'/public/css/style.css', rel: 'stylesheet'},
                                {style:'/public/css/responsive.css',type: 'text/css', rel: 'stylesheet'}
                            ]
                        },
                        components: ['mynav','myfooter','mymaincontent']
                    }
                };
                res.render('index',scope);
            });
        })
        .catch(error => {
            console.log(error);
            // error;
        });
    // let results = search.findLoc(uLat, uLong, uType, uR);
    // console.log(results);
    // res.json(results);
});

app.post('/find/dist', (req, res) => {
    console.log(req.body);
   let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);
    //let db = promise.db;
    db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
        "WHERE id_type = ${Type} AND id_district = ${District};",
        {
            District: district,
            Type: type
        })
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let scope = {
                    data: {
                        data: result,
                    }
                    , vue: {
                        head: {
                            title: 'Home',
                            meta:[
                                // script
                                {script:'/public/js/vue.min.js'},
                                {sript:'/public/js/jquery-3.2.0.min.js'},
                                {script:'/public/js/vue.min.js'},
                                {script:'/public/js/bootstrap.min.js'},
                                {script:'/public/js/script.js'},

                                // style
                                {style:'/public/css/reset.css',type: 'text/css', rel: 'stylesheet'},
                                {style:'/public/css/bootstrap.min.css', rel: 'stylesheet'},
                                {style:'/public/css/font-awesome.min.css', rel: 'stylesheet'},
                                {style:'/public/css/style.css', rel: 'stylesheet'},
                                {style:'/public/css/responsive.css',type: 'text/css', rel: 'stylesheet'}
                            ]
                        },
                        components: ['mynav','myfooter','mymaincontent']
                    }
                };
                res.render('index',scope);
            });
        })
        .catch(error => {
            console.log(error);
            // error;
        });
    /*let results = search.findLocInDistrict(type, district);
     console.log(results);
     res.json(results);*/
});

//REST for Mobile
app.post('/find/location', (req, res) => {
    // let uLong = req.body['long'],
    //     uLat = req.body['lat'],
    //     uType = req.body['type'],
    //     uR = req.body['r'];
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);
    console.log(uR, uType, uLong, uLat);

    //let db = promise.db;
    db.any(
        //"SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location WHERE ST_DWithin(geog, ST_Point(${uLong}, ${uLat})::geography, ${uR}) AND id_type = ${uType};",
        "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
        "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
        "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
        {
            Long: uLong,
            Lat: uLat,
            R: uR,
            Type: uType
        })
        .then(data => {
            //console.log(data);
            async.mapSeries(data, merge2, (err, result) => {
                // let dt = {
                //     'datas': result
                // };
                //res.render('index1.html', dt);

                //let myJson = result;
                //console.log(myJson)
                res.json(result)
            });
            // res.json(data);
            // success;
        })
        .catch(error => {
            console.log(error);
            // error;
        });
    // let results = search.findLoc(uLat, uLong, uType, uR);
    // console.log(results);
    // res.json(results);
});

app.post('/find/district', (req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);
    //let db = promise.db;
    db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
        "WHERE id_type = ${Type} AND id_district = ${District};",
        {
            District: district,
            Type: type
        })
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                // let dt = {
                //     'datas': result
                // };
                //res.render('index1.html', dt);
                // success;
                res.json(result)
            })
        })
        .catch(error => {
            console.log(error);
            // error;
        });
    /*let results = search.findLocInDistrict(type, district);
     console.log(results);
     res.json(results);*/
});

function merge2(item, cb) {
    let id_location = item['id_location'];
    let id_type = item['id_type'];
    let id_district = item['id_district'];
    db.one("select name from coffy.district where id_district=${id_district}", {
        id_district: id_district
    })
        .then((result) => {
            item['district'] = result['name'];
            db.one("select name from coffy.type where id_type=${id_type}", {
                id_type: id_type
            })
                .then((result) => {
                    item['type'] = result['name'];
                    db.one("select name from coffy.image where id_location=${id_location}", {
                        id_location: id_location
                    })
                        .then((result) => {
                            let imgPath = '/public/coffy_img/' + result['name'];
                            item['image'] = imgPath;
                            cb(null, item);
                        });
                    // console.log(item);
                })
                .catch((err) => {
                    cb(err, null);
                });
        })
        .catch((err) => {
            cb(err, null);
        });
}


