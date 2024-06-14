const router = require("express").Router();
const {
  addList,
  deleteList,
  getList,
  editList,
  getListById,
  myList,
  changeStatus,
} = require("../controller/ListController");
const { isProvider } = require("../middleware/validateRole");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/add-list").post(validateToken, isProvider, addList);
router.route("/delete-list/:id").delete(validateToken, isProvider, deleteList);
router.route("/get-list").get(validateToken, getList);
router.route("/my-list").get(validateToken, isProvider, myList);
router.route("/change-status").put(validateToken, isProvider, changeStatus);

router.route("/edit-list/:_id").put(validateToken, isProvider, editList);
router.route("/get-list-by-id/:_id").get(validateToken, getListById);

module.exports = router;
