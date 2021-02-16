const router = require('express').Router();
let Entry = require('../models/entry.model');
const sanitize = require("mongo-sanitize");

router.route('/').get((req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = sanitize(req.body.username);
  const title = sanitize(req.body.title);
  const text = sanitize(req.body.text);
  const date = Date.parse(sanitize(req.body.date));

  const newEntry = new Entry({
    username,
    title,
    text,
    date,
  });

  newEntry.save()
  .then(() => res.json('Entry added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => {
      entry.username = sanitize(req.body.username);
      entry.title = sanitize(req.body.title);
      entry.text = sanitize(req.body.text);
      entry.date = Date.parse(sanitize(req.body.date));

      entry.save()
        .then(() => res.json('Entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;