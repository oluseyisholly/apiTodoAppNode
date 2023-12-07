const pool = require('../dbconfig');


const getAllActivities = (request, response) => {
  pool.query('SELECT * FROM events', (error, results) => {


    if (error) {
      response.status(500).json(error.message)
    }
    response.status(200).json(results.rows);
  })
};


const getActivityById = (request, response) => {

  const { id } = request.params;

  pool.query(`SELECT * FROM events WHERE id = ${id} ORDER BY id`, (error, results) => {

    if (error) {

      response.status(500).json(error.message);
    }
    response.status(201).json(results.rows);
  });
}

const getActivityByUserId = (request, response) => {

  const userid = request.user

  pool.query(`SELECT * FROM events WHERE userid = $1 ORDER BY id`, [userid], (error, results) => {

    if (error) {
      response.status(500).json(error.message);
    }

    response.status(201).json(results.rows);
  });
}

const updateActivityById = (request, response) => {

  const { id } = request.params;
  const { isdone } = request.body;


  pool.query(`UPDATE events SET  isDone = $2 WHERE id = $1`, [id, isdone], (error, results) => {

    if (error) {
      response.status(500).json(error.message);
    }
    response.status(200).json(`event modified with ID: ${id}`);

  });
}

const deleteActivityById = (request, response) => {

  const { id } = request.params;

  pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {

    if (error) {
      response.status(500).json(error.message);
    }
    response.status(200).json(`event deleted with ID: ${id}`);

  });
}


const createActivity = (request, response) => {
  const { activity, isDone, activityTime } = request.body
  const userid = request.user
  // const token = req.header('Authorization');

  // const decoded = jwt.verify(token, process?.env?.SECRET_KEY || 'secretkey');

  pool.query(`INSERT INTO events (activity, isDone, activityTime, userid) VALUES ($1, $2, $3, $4) RETURNING *`, [activity, isDone, activityTime, userid], (error, results) => {

    if (error) {
      response.status(500).json(error.message);
    }
    else{
      response.status(201).json(`event added with ID: ${results?.rows[0]?.id}`)
    }
    
  });
};

module.exports = { getAllActivities, createActivity, getActivityById, updateActivityById, deleteActivityById ,getActivityByUserId}