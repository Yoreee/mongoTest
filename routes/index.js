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

router.post('/adduser', function(req, res, next) {
	var db = req.db;

	var username = req.body.username;
	var email = req.body.email;

	var collection = db.get('usercollection');

	collection.insert({
		"username": username,
		"email": email
	}, function(err, doc) {
		if (err) {
			console.log(err)
		} else {
			res.redirect('userlist')
		}
	})
})

router.get('/editUser/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection')

	collection.findById(req.params.id, function(err, doc) {
		if (err) {
			console.log(err)
		} else {
			res.render('editUser', {title: "Edit User", doc: doc})	
		}
	})
})

router.post('/updateUser/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	// console.log(req.body)
	collection.updateById(req.params.id, {username: req.body.username, email: req.body.email}, function(err) {
		if (err) {
			console.log(err)
		} else {
			console.log('update??')
			res.redirect('/userlist')
		}
	})
})
module.exports = router;
