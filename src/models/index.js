const Event = require('./event');
const User = require('./user');

const sequelize = require('../dbconfig')


User.hasMany(Event, { as: 'Events', foreignKey: 'userid' });

Event.belongsTo(User, { foreignKey: 'userid' });


sequelize.sync({ force: true }).then(() => {
  console.log('Connected Sucessfully')
}).catch((error) => {
  console.log('Error connecting to the data base:',error)
}).finally(() => {
  // Close the database connection when synchronization is complete
  sequelize.close();
});


module.exports = {Event, User, sequelize};