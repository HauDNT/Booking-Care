import { raw } from "body-parser";
import db from "../models";
import bcrypt from "bcrypt";

let salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHashed = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: passwordHashed,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            });

            resolve("Created a new user success!");
        } catch (error) {
            reject(error);
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({raw: true});

            resolve(users);            
        } catch (error) {
            reject(error);
        }
    })
}

const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            });

            if (user) {
                resolve(user);
            }
            else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
}

const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                }
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve();
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })

            if (user) {
                user.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}