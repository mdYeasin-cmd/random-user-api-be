const fs = require('fs');
const path = require('path');
const { getSingleRandomUser } = require('../utils/getRandomUser');

// file path name (userData.json)
const pathName = path.join(__dirname, '../utils/userData.json');

exports.getARandomUser = async (req, res) => {
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
};

exports.saveANewUser = (req, res) => {
    const user = req.body;

    fs.readFile(pathName, "utf-8", (err, data) => {
        if (err) {
            console.log("Error occur when try to read file (Lnie 41)");
            res.send("Can't not read the file");
        }

        const parsedData = JSON.parse(data);

        // check same isSameId
        const isSameId = parsedData.find(currentUser => currentUser.id === user.id);

        let newUserData;

        if (isSameId === undefined) {
            newUserData = [...parsedData, user];
        } else {
            res.send("Same user id's user already exists. Please try different user id");
        }

        fs.writeFile(pathName, JSON.stringify(newUserData, null, 4), (error) => {
            if (error) {
                console.log("An error has occurred when try to write file", error);
                res.send("Can't write on this file");
            }
            console.log("Data written successfully to the file");
            res.send("Data successfully added on useData.json file");
        });
    });
};

exports.updateAUser = (req, res) => {
    const user = req.body;
    const userProperty = Object.keys(user);

    fs.readFile(pathName, "utf-8", (err, data) => {
        if (err) {
            console.log("Error occur when try to read file (Lnie 41)");
            res.send("Can't not read the file");
        }

        const parsedData = JSON.parse(data);

        // find user 
        const willUpdateTheUser = parsedData.find(currentUser => currentUser.id === user.id);

        if (willUpdateTheUser) {
            for (const property in willUpdateTheUser) {
                if (userProperty.includes(property)) {
                    willUpdateTheUser[property] = user[property]
                }
            }
        } else {
            res.send("We can't find the user information");
        }

        fs.writeFile(pathName, JSON.stringify(parsedData, null, 4), (error) => {
            if (error) {
                console.log("An error has occurred when try to write file", error);
                res.send("Can't write on this file");
            }
            console.log("Data written successfully to the file");
            res.send("Data successfully added on useData.json file");
        });
    });
};

exports.deleteAUser = (req, res) => {
    const { id } = req.body;

    fs.readFile(pathName, "utf-8", (err, data) => {
        if (err) {
            console.log("Error occur when try to read file (Lnie 41)");
            res.send("Can't not read the file");
        };

        const parsedData = JSON.parse(data);

        // check same isSameId
        const isSameId = parsedData.find(currentUser => currentUser.id === id);

        let newUserList;

        if (isSameId) {
            newUserList = parsedData.filter(currentUser => currentUser.id !== id);
        } else {
            res.send("This user data we not found here!!!");
        }

        fs.writeFile(pathName, JSON.stringify(newUserList, null, 4), (error) => {
            if (error) {
                console.log("An error has occurred when try to delete a user", error);
                res.send("Can't write on this file");
            }
            console.log("Data written successfully to the file");
            res.send("User deleted successfully");
        });
    });
};

exports.updateMultipleUser = (req, res) => {
    const { ids, userList } = req.body;

    fs.readFile(pathName, "utf-8", (err, data) => {
        if (err) {
            console.log("Error occur when try to read file (Lnie 41)");
            res.send("Can't not read the file");
        };

        const parsedData = JSON.parse(data);

        console.log(parsedData);

        res.send("Done!");

        // for (let id of ids) {
        //     const willUpdateTheUser = parsedData.find(currentUser => currentUser.id === id);
        //     for (const property in willUpdateTheUser) {
        //         if (userProperty.includes(property)) {
        //             willUpdateTheUser[property] = user[property]
        //         }
        //     }
        // }

        // if (willUpdateTheUser) {
        //     for (const property in willUpdateTheUser) {
        //         if (userProperty.includes(property)) {
        //             willUpdateTheUser[property] = user[property]
        //         }
        //     }
        // } else {
        //     res.send("We can't find the user information");
        // }

        // check same isSameId
        // const isSameId = parsedData.find(currentUser => currentUser.id === id);

        // let newUserList;

        // if (isSameId) {
        //     newUserList = parsedData.filter(currentUser => currentUser.id !== id);
        // } else {
        //     res.send("This user data we not found here!!!");
        // }

        // fs.writeFile(pathName, JSON.stringify(newUserList, null, 4), (error) => {
        //     if (error) {
        //         console.log("An error has occurred when try to delete a user", error);
        //         res.send("Can't write on this file");
        //     }
        //     console.log("Data written successfully to the file");
        //     res.send("User deleted successfully");
        // });
    });
}