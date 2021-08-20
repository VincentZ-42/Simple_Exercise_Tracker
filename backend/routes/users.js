const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {

  // When you refactor, you can use try catch method instead
  // Also use asychnronous functions such as await n async.....this is old school
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;