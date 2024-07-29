import express from "express";
import homeController from "../controllers/homeController.js";
import userControlller from "../controllers/userController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUDPage);
    router.get("/display-crud", homeController.displayCRUD);

    router.post("/post-crud", homeController.postCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    router.post("/api/login", userControlller.handleLogin);

    return app.use("/", router);
};

module.exports = initWebRoutes;