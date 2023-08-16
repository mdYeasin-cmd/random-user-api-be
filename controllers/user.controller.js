const fs = require('fs');
const path = require('path');
const { getSingleRandomUser } = require('../utils/getRandomUser');

exports.getARandomUser = async (req, res) => {
    const pathName = path.join(__dirname, '../utils/userData.json');

    fs.readFile(pathName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.send("Something wrong from the api endpoint");
        } else {
            const usersData = JSON.parse(data);
            const aRandomUser = getSingleRandomUser(usersData);
            res.send(aRandomUser);
        }
    });
};

exports.getAllUser = (req, res) => {
    const { limit } = req.query;
    const pathName = path.join(__dirname, '../utils/userData.json');

    fs.readFile(pathName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.send("Something wrong from the api endpoint");
        } else {
            const usersData = JSON.parse(data);
            const limitedUserData = usersData.splice(0, limit);
            res.send(limitedUserData);
        }
    });
}