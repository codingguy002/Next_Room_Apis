const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: [true, "ListId is required"],
    },
    listData: {
      type: Object,
      default: {},
    },
    posterPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Poster Person Id is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    posterData: {
      type: Object,
      default: {},
    },
    request_details: {
      rent: {
        type: String,
        enum: ["monthly", "weekly"],
        required: [true, "Rent must be monthly/weekly"],
      },
      // rentAmount: {
      //   type: Number,
      //   required: [true, "Rent amount is required"],
      // },
      security_deposit: {
        type: Number,
        required: [true, "Security Deposit is required"],
      },
      smoke_drink: {
        type: [String],
        enum: ["smoke", "drink", "no"],
        required: [true, "Smoke/Drink must be smoke, drink, no"],
      },
      accommodatePets: {
        type: String,
        enum: ["yes", "no"],
        required: [true, "select yes or no"],
      },

      accomodationFor: {
        type: [String],
        enum: ["Myself", "Kids", "Couple"],
        required: [true, "select myself, kids, couple"],
      },
      numberOfKids: {
        type: Number,
      },
      kidsAges: {
        type: [Number],
      },

      numberOfCats: {
        type: Number,
        required: function () {
          return this.request_details.accommodatePets === "yes";
        },
      },
      numberOfDogs: {
        type: Number,
        required: function () {
          return this.request_details.accommodatePets === "yes";
        },
      },

      readyToMove: {
        type: Date,
        required: [true, "Date is required"],
      },
      minimum_stay: {
        type: Number,
        required: [true, "Number of Stay is required"],
      },
      stay_time: {
        type: String,
        enum: ["days", "week", "month"],
        required: [true, "Please select stay time"],
      },
      preferred_amenities: {
        type: [String],
        enum: ["Furnished Room", "Unfurnished Room", "Private Bathroom"],
        required: [true, "Please select preferred amenities"],
      },
      additional_note: {
        type: String,
      },
      status: {
        type: String,
        enum: ["New", "Accepted", "Denied"],
        default: "New",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
