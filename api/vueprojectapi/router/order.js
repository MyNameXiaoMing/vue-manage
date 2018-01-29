var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/order', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM db_hotel.order limit ' + start + ',10';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                res.send(data);
            })
        }),

        app.post('/delorder', function(req, res){
            console.log(req.body.id)
            let id = req.body.id;
            let sql = `delete from db_hotel.order where id = "${req.body.id}"`;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updataorder', function(req, res){
            console.log(req.body.linkman);
            console.log(req.body.telephone);
            console.log(req.body.startime);
            console.log(req.body.endtime);
            console.log(req.body.totalPrice);
            let orderId = req.body.orderId;
            let linkman = req.body.linkman;
            let tel = req.body.telephone;
            let startime = req.body.startime;
            let endTime = req.body.endtime;
            let totalPrice = req.body.totalPrice;
            let sql = `UPDATE db_hotel.order SET linkman='${linkman}', telephone='${tel}',startTime='${startime}',endTime='${endTime}',totalPrice='${totalPrice}' WHERE orderId='${orderId}'`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/insertorder', function(req, res){
            console.log(req.body.linkman);
            console.log(req.body.telephone);
            console.log(req.body.startime);
            console.log(req.body.endtime);
            console.log(req.body.totalPrice);
            let linkman = req.body.linkman;
            let tel = req.body.telephone;
            let startime = req.body.startime;
            let endtime = req.body.endtime;
            let totalPrice = req.body.totalPrice;

            let sql = `INSERT INTO db_hotel.order ( linkman, telephone, startTime, endTime, totalPrice) VALUES ("${linkman}", "${tel}","${startime}", "${endtime}","${totalPrice}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }

}