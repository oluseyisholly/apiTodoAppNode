const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Todo',
  password: 'Oluseyisholly!123',
  port: 8000,
})  

const getAllActivities = (request, response) => {
    pool.query('SELECT * FROM events', (error, results) => {
      if (error) {
        response.status(500).json(error.message)
      }
      response.status(200).json(results.rows)
    })
  };

  debugger
  const getActivityById = (request, response) => {

    const {id} = request.params;
    console.log(id);

    pool.query(`SELECT * FROM events WHERE id = ${id}`, (error, results) => {

        if (error) {

            response.status(500).json(error.message);
          }
          response.status(201).json(results.rows);
    });
  }

  const updateActivityById = (request, response) => {

    const {id} = request.params;
    const {activity} = request.body;
    

    pool.query(`UPDATE events SET activity = $1 WHERE id = $2`, [activity, id], (error, results) => {

        if (error) {
            response.status(500).json(error.message);
          }
          response.status(200).send(`event modified with ID: ${id}`);
          
    });
  }

  const deleteActivityById = (request, response) => {

    const {id} = request.params;

    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {

        if (error) {
            response.status(500).json(error.message);
          }
          response.status(200).send(`event deleted with ID: ${id}`);
          
    });
  }


  const createActivity = (request, response) => {
    const { activity } = request.body
  
    pool.query(`INSERT INTO events (activity) VALUES ($1) RETURNING *`, [activity], (error, results) => {
      if (error) {
        response.status(500).json(error.message);
      }
      response.status(201).send(`event added with ID: ${results.rows[0].id}`)
    });
  };

  module.exports = {getAllActivities, createActivity, getActivityById, updateActivityById, deleteActivityById}