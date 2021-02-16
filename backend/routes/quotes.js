const router = require('express').Router();
let Quote = require('../models/quote.model');
const sanitize = require("mongo-sanitize");

router.route('/').get((req, res) => {
  Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = sanitize(req.body.username);
  const text = sanitize(req.body.text);
  const author = sanitize(req.body.author);
  //const duration = Number(req.body.duration);
  //const date = Date.parse(req.body.date);

  const newQuote = new Quote({
    username,
    text,
    author
    // duration,
    // date,
  });

  newQuote.save()
  .then(() => res.json('Quote added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Quote.findById(req.params.id)
    .then(quote => res.json(quote))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Quote.findByIdAndDelete(req.params.id)
    .then(() => res.json('Quote deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Quote.findById(req.params.id)
    .then(quote => {
      quote.username = sanitize(req.body.username);
      quote.text = sanitize(req.body.text);
      quote.author = sanitize(req.body.author);
    //   exercise.duration = Number(req.body.duration);
    //   exercise.date = Date.parse(req.body.date);

      quote.save()
        .then(() => res.json('Quote updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;