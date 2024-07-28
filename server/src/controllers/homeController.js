import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
    try {
        const getData = await db.User.findAll();
        console.log("------------------------");
        console.log(getData);
        console.log("------------------------");
    
        return res.render('homepage.ejs', {
            data: JSON.stringify(getData),
        });
    } catch (error) {
        console.log(error);
    }
};

const getCRUDPage = (req, res) => {
    return res.render("crud.ejs");
}

const displayCRUD = async (req, res) => {
    const usersData = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", {
        data: usersData
    })
}

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD");
};

const editCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        return res.render("editCRUD.ejs", {user: userData});
    }
    else {
        return res.send("User not found!");
    }
};

const putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {data: allUsers});
};

const deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("Delete user success!");
    }
    else {
        return res.send("User not found!");
    }
    
};

module.exports = {
    getHomePage: getHomePage,
    getCRUDPage: getCRUDPage,
    displayCRUD: displayCRUD,
    postCRUD: postCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}