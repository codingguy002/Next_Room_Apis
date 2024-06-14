const List = require("../model/List");
const User = require("../model/User");

const handleMsg = require("../ErrorHandling/handleMsg");
const { parser } = require("../helpers");
const {
  admin,
  userServiceAccount,
  sendNotificationUsingApp,
} = require("../firebase/index");

const NextRoomApp = admin.initializeApp(
  {
    credential: admin.credential.cert(userServiceAccount),
  },
  "NextRoom1"
);
const addList = async (req, res) => {
  try {
    await parser.array("images")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ status: false, message: "Image upload failed" });
        return;
      }
      const getUser = await User.find({ role: "seeker" });
      // const list = { ...req.body };
      console.log(req.body, "body");
      const list = {
        title: req.body.title,
        property_type: req.body.property_type,
        property_details: {
          room: req.body.property_details["room"],
          landlord: req.body.property_details["landlord"],
          bathroom: req.body.property_details["bathroom"],
          bathroom_type: req.body.property_details["bathroom_type"],
          furnished_type: req.body.property_details["furnished_type"],
          utilities_included: req.body.property_details["utilities_included"],
          roommates: {
            male: req.body.property_details["roommates"]["male"],
            female: req.body.property_details["roommates"]["female"],
          },
        },
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        security_deposit: req.body.security_deposit,
        rent: {
          amount: req.body.rent["amount"],
          time: req.body.rent["time"],
        },
        lease: req.body.lease,
        description: req.body.description,
        availableFrom: req.body.availableFrom,
        facilities: {
          laundry_type: req.body.facilities["laundry_type"],
          parking_type: req.body.facilities["parking_type"],
          cat_friendly: req.body.facilities["cat_friendly"],
          dog_friendly: req.body.facilities["dog_friendly"],
          cannabis_friendly: req.body.facilities["cannabis_friendly"],
          children_friendly: req.body.facilities["children_friendly"],
        },
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        images: req.files ? req.files : [],
        owner:req.user
      };
      console.log({ list }, "sayenListHe");
      console.log({ files: req.files });

      // list.owner=req.user
      const newList = new List(list);
      console.log({ newList });
      await newList.save();
      handleMsg(res, "success", 200, null, "List added successfully");
      const messageForUser = {
        notification: {
          title: "Attention",
          body: "New room has been listed",
        },
      };
      await getUser.map(async (item) => {
        if (item?.fcm_token?.length > 0) {
          await sendNotificationUsingApp(
            NextRoomApp,
            item?.fcm_token,
            messageForUser
          );
        }
      });
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
const changeStatus = async (req, res) => {
  try {
    const { listId, status } = req.body;
    // const listId = req.body.listId;
    const updateList = await List.findOneAndUpdate(
      {
        _id: listId,
      },
      {
        $set: { status: status },
      }
    );
    updateList &&
      handleMsg(res, "success", 200, null, "Status Changed Successfully");
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
    const list = await List.find(filter).sort({ createdAt: -1 });
    handleMsg(res, "success", 200, list, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const myList = async (req, res) => {
  try {
    const user = req.user;

    let filter = {
      "owner._id": user._id,
    };
    const { status } = req.query;
    if (status) {
      filter.status = status;
    }
    console.log({ filter });
    const list = await List.find(filter).sort({ createdAt: -1 });
    console.log({ list });
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

module.exports = {
  addList,
  deleteList,
  getList,
  editList,
  getListById,
  myList,
  changeStatus,
};
