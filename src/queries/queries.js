const pool = require('../dbconfig');
const Event = require('../models/event');


const getAllActivities =async (req, res) => {

  try{
    const allActivities = await Event.findAll();

    res.status(200).json(allActivities)

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const getActivityById = async (req, res) => {

  try{
    const { id } = req.params;
    const result = await Event.findOne({where: {id}});
    
    res.status(200).json(result?.dataValues);

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
}

const getActivityByUserId = async (req, res) => {

  try{
    const userid = req.user;
    console.log(userid);
    const result = await Event.findAll({where: {userid},order:[['id', 'ASC']] });

    
    res.status(200).json(result);

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
}

const updateActivityById = async (req, res) => {

  try{
    const { id } = req.params;
     const { isdone } = req.body;

    const result = await Event.update({isdone},{where: {id}});
    res.status(200).json(result);

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }

}

const deleteActivityById = async (req, res) => {


  try{
    const { id } = req.params;

    const result = await Event.destroy({where: {id}});
    res.status(200).json(result);
  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }

}


const createActivity = async (req, res) => {
  try{
    const { activity, isDone, activityTime } = req.body
    const userid = req.user;

    console.log(userid);

    const result = await  Event.create({activity,activitytime: activityTime,isdone: isDone, userid: userid});

    console.log(result)

    res.status(200).json({result});

    

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllActivities, createActivity, getActivityById, updateActivityById, deleteActivityById ,getActivityByUserId}