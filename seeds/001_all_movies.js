
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('all_movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('all_movies').insert([
        {id: 1, title: 'Jurassic Park', director: 'Steven Spielberg', year: 1993, rating: 8, poster_link: 'http://cdn.shopify.com/s/files/1/1148/8924/products/MPW-71462-a_ee1d83d9-96a7-4ba1-bd41-e26ce30b6dd3_1024x1024.jpg?v=1484668913'},
        {id: 2, title: 'Thor', director: 'Kenneth Branag', year: 2011, rating: 7, poster_link: 'https://movieposters2.com/images/706952-b.jpg'},
        {id: 3, title: 'Iron Man', director: 'Jon Favreau', year: 2008, rating: 8, poster_link: 'http://www.gstatic.com/tv/thumb/v22vodart/170620/p170620_v_v8_al.jpg'}
      ])
      .then(() => {
        return knex.raw("SELECT setval('all_movies_id_seq', (SELECT MAX(id) FROM all_movies));")
      })
    })
}
