const List = require("../model/List");
const handleMsg = require("../ErrorHandling/handleMsg");
const { parser } = require("../helpers");

const addList = async (req, res) => {
  try {
    parser.array("image")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ status: false, message: "Image upload failed" });
        return;
      }
      const list = { ...req.body };
      const imageUrl = req.files ? req.files : "";
      list.image = imageUrl;
      list.userId = req.user._id;
      const newList = new List(list);
      await newList.save();
      handleMsg(res, "success", 200, null, "List added successfully");
    });
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const editList = async (req, res) => {
  try {
    const { _id } = req.params;
    const findId = await List.findById({ _id });
    parser.array("image")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ status: false, message: "Image upload failed" });
        return;
      }
      const newList = { ...req.body };
      const imageUrl = req.files ? req.files : findId.image; // Get the Cloudinary URL of the uploaded image
      if (imageUrl.length === 0) {
        res.status(400).json({ msg: "Image is required", status: false });
        return;
      }
      newList.image = imageUrl;
      const updatedList = await List.findOneAndUpdate(
        {
          _id,
        },
        {
          $set: newList,
        }
      );
      updatedList &&
        handleMsg(res, "success", 200, null, "List Updated successfully");
    });
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const getList = async (req, res) => {
  try {
    let filter = {};
    const { status } = req.query;
    if (status) {
      filter.status = status;
    }
    const list = await List.find(filter);
    handleMsg(res, "success", 200, list, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const getListById = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const list = await List.findById({ _id });
    handleMsg(res, "success", 200, list, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.deleteOne({ _id: id });
    handleMsg(res, "success", 200, null, "List deleted successfully");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

module.exports = { addList, deleteList, getList, editList, getListById };
