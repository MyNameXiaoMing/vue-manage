var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/login', function(req, res){
            var sql = `SELECT * FROM user`;
            db.select(sql, function(data){
                res.send(data);
            })
        })
    }
}