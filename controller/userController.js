const User = require("../model/User");
const handleMsg = require("../ErrorHandling/handleMsg");
const { parser } = require("../helpers");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

const getUserProfile = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  try {
    const findUser = await User.findById({ _id });

    console.log({ findUser });

    handleMsg(res, "success", 200, findUser, "");
  } catch (e) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const updateProfile = async (req, res) => {
  console.log({ req: req.body });
  try {
    parser.single("image")(req, res, async (err) => {
      if (err) {
        handleMsg(res, "error", 400, null, "Image upload failed");
        return;
      }

      // If image upload succeeded, proceed to create the category
      const { _id } = req.user;
      const newUserr = await User.findById({ _id: _id });

      const { fullname, password } = req.body;
      const imageUrl = req.file ? req.file.path : newUserr.image; // Get the Cloudinary URL of the uploaded image
      console.log({ imageUrl });
      if (fullname?.length < 5) {
        handleMsg(
          res,
          "error",
          400,
          null,
          "FullName must be atleast 5 characters long"
        );

        return;
      } else if (password.length < 8) {
        handleMsg(
          res,
          "error",
          400,
          null,
          "Password must be atleat 8 characters long"
        );

        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log({ changes: password });

      const newUser = await User.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            fullname: fullname,
            password: hashedPassword,
            image: imageUrl,
            pass: password,
          },
        },
        { new: true }
      );
      console.log({ newUser });
      handleMsg(
        res,
        "success",
        200,
        newUser,
        "User profile updated successfully"
      );
    });
  } catch (e) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const updatePublicProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { address, city, state, zip_code } = req.body;
    const newUser = await User.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          address: address,
          city: city,
          state: state,
          zip_code: zip_code,
        },
      },
      { new: true }
    );
    handleMsg(
      res,
      "success",
      200,
      newUser,
      "User Public Profile updated successfully"
    );
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const payment = async (req, res) => {
  try {
    //get amount from user
    // const customer = await stripe.customers.create();
    // const ephemeralKey = await stripe.ephemeralKeys.create(
    //   {
    //     customer: customer.id,
    //   },
    //   { apiVersion: "2024-06-14" }
    // );
    const totalAmount = req?.body?.amount;
    if (!totalAmount) {
      handleMsg(res, "error", 404, null, "Amount is required");
      return;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: +totalAmount * 100,
      currency: "usd",
      // customer: customer.id,
      payment_method_types: ["card"],
      metadata: { name: req?.body?.name },
    });
    handleMsg(res, "success", 200, {
      paymentIntent: paymentIntent.client_secret,
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer.id,
    });
  } catch (err) {
    console.log(err);
    handleMsg(res, "error", 500, null, err.message);
  }
};

const paymentFullfillment = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEEBHOOK_SECRET
    );
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }

  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment I
  }
  res.json({ ok: true });
};

module.exports = {
  getUserProfile,
  updateProfile,
  updatePublicProfile,
  payment,
  paymentFullfillment,
};
