var express = require('express');
var router = express.Router();
const knex = require('../knex')

// READ ALL
router.get('/', (req, res, next) => {
  knex('all_movies')
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
})

//READ ONE
router.get('/:id', (req, res, next) => {
  // validate id is a number, escape any special chars that would indicate SQL injection. Do this later.
  knex('all_movies')
  .where('id', req.params.id)
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
})

// CREATE ONE
router.post('/', (req, res, next) => {
  // we'll need some POST body data in order to create a new cryptid (req.body)
  // If we wanted to do some validation, it would go like:
  // let err = new Error('validation failed')
  // if( !req.body.name ) { next(err) }
  let newRecord = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    poster_link: req.body.poster_link
  }

  knex('all_movies')
  .insert(newRecord)
  .returning('*')
  .then((insertedRecord) => {
    res.send(insertedRecord)
  })
  .catch((err) => {
    next(err)
  })
})

// // UPDATE ONE
router.patch('/:id', (req, res, next) => {
  // FIRST KNEX CALL: Using the given id (req.params.id), look up if that record actually exists
  knex('all_movies')
  .where('id', req.params.id)
  .then((results) => {
    // If found, go ahead and update that record
    if(results.length>0) {
      // It was found-- update it. Check to see what new data was provided via req.body
      let myRecord = results[0]
      if( req.body.title ) { myRecord.title = req.body.title }
      if( req.body.director ) { myRecord.director = req.body.director }
      if( req.body.year ) { myRecord.year = req.body.year }
      if( req.body.rating ) { myRecord.rating = req.body.rating }
      if( req.body.poster_link ) { myRecord.poster_link = req.body.poster_link }

      // SECOND KNEX CALL: Update the record in the DB
      knex('all_movies')
      .update(myRecord)
      .where('id', req.params.id)
      .returning('*')
      .then((updatedRecord) => {
        // Send back the newly updated record object
        res.send(updatedRecord)
      })

    } else {
      // Couldn't find a record whose id = req.params.id
      throw new Error('YA DINGUS. NOT FOUND.')
    }
  })
  .catch((err) => {
    next(err)
  })
})
//
// // DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
    // FIRST KNEX CALL: Using the given id (req.params.id), look up if that record actually exists
    knex('all_movies')
    .where('id', req.params.id)
    .then((foundRecords) => {
      // if it exists, delete it
      if( foundRecords.length > 0 ) {

        // SECOND KNEX CALL: Delete the record from the DB
        knex('all_movies').del()
        .where('id', req.params.id)
        .returning('*')
        .then((results) => {
          let deletedRecord = results[0]
          res.send(deletedRecord)
        })

      } else {
        // Couldn't find what I'm trying to delete
        throw new Error(`Can't delete what does not exist`)
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
