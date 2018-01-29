var db = require('../db/db');

module.exports = {
	register:function(_app){
		_app.get('/getHotelRoom',function(req,res){
			db.getHotelRoom(req.query,function(result){
				res.send(result);
			})
		})
	}
}