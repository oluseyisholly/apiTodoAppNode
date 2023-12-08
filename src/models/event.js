const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');



const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activitytime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isdone: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
});




module.exports = Event;