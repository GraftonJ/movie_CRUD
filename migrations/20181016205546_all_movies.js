
exports.up = function(knex, Promise) {
  return knex.schema.createTable('all_movies', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments()   // id field, auto PK
   table.string('title').notNullable()
   table.string('director').notNullable()
   table.integer('year')
   table.integer('rating').notNullable()
   table.string('poster_link')
 })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('all_movies')
}
