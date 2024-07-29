import db from "../models";
import bcrypt from "bcrypt";

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email }
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User's not found!";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist`;
            }
            
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });

            if (user) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    checkUserEmail: checkUserEmail,
}