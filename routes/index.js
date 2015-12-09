var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
	var greeting = "Greetings world"
	res.render('helloworld', {title: greeting})
})

router.get('/userlist', function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			'userlist' : docs
		})
	})
})

router.get('/newuser', function(req, res, next) {
	res.render('newuser', {title: 'Add new user'});
});


module.exports = router;
