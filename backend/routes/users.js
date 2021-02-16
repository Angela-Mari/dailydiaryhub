const router = require('express').Router();
let User = require('../models/user.model');
const sanitize = require("mongo-sanitize")

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = sanitize(req.body.username);
  const theme = Number(sanitize(req.body.theme));

  const newUser = new User({
    username,
    theme
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(sanitize(req.params.id))
    .then(user => {
      user.username = user.username;
      user.theme = Number(req.body.theme);
      
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;