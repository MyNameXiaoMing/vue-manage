var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/hotel', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM hoteltest limit ' + start + ',10';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                res.send(data);
            })
        }),

        app.post('/delhotel', function(req, res){
            console.log(req.body.name)

            let sql = `delete from hoteltest where hotelName = "${req.body.name}"` ;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updatahotel', function(req, res){
            console.log(req.body.name);
            console.log(req.body.address);
            console.log(req.body.id);
            var uname = req.body.name;
            var address = req.body.address;
            var _id = req.body.id;
            let sql = `UPDATE hoteltest SET hotelName="${uname}", address="${req.body.address}" WHERE id="${_id}"`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/inserthotel', function(req, res){
            console.log(req.body.name);
            console.log(req.body.address);
            console.log(req.body.id);
            let uname = req.body.name;
            let address = req.body.address;
            
            let sql = `INSERT INTO hoteltest ( hotelName, address) VALUES ("${uname}", "${address}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }


}