var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/user', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM user limit ' + start + ',10';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/deluser', function(req, res){
            console.log(req.body.telephone)

            let sql = `delete from user where id = "${req.body.id}"` ;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updatauser', function(req, res){
            console.log(req.body.name);
            console.log(req.body.address);
            console.log(req.body.id);
            let uname = req.body.name;
            let telephone = req.body.telephone;
            let _id = req.body.id;
            let gender = req.body.gender;
            let birthday = req.body.birthday;
            let sql = `UPDATE user SET nickname="${uname}", telephone="${telephone}" ,gender="${gender}", birthday="${birthday}" WHERE id="${_id}"`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/insertuser', function(req, res){
            console.log(req.body.name);
            console.log(req.body.telephone);
            console.log(req.body.id);
            let uname = req.body.name;
            let telephone = req.body.telephone;
            let gender = req.body.gender;
            let birthday = req.body.birthday;
            let sql = `INSERT INTO user ( nickname, telephone,gender,birthday) VALUES ("${uname}", "${telephone}","${gender}","${birthday}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }


}