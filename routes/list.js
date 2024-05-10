const router = require("express").Router();
const {
  addList,
  deleteList,
  getList,
  editList,
  getListById,
} = require("../controller/ListController");
const { isProvider } = require("../middleware/validateRole");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/add-list").post(validateToken, isProvider, addList);
router.route("/delete-list/:id").delete(validateToken, isProvider, deleteList);
router.route("/get-list").get(validateToken, getList);
router.route("/edit-list/:_id").put(validateToken, isProvider, editList);
router.route("/get-list-by-id/:_id").get(validateToken, getListById);

module.exports = router;
