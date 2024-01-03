const router = require("express").Router();
const controller = require("./url.controller");





const methodNotAllowed = require("../errors/methodNotAllowed");

const usesRouter = require("../uses/uses.router");



router.use("/:urlId/uses", controller.urlExists,usesRouter);


router.route("/:urlId").get(controller.read).put(controller.update).all(methodNotAllowed);



router.route("/").post(controller.create).get(controller.list).all(methodNotAllowed);






module.exports = router;