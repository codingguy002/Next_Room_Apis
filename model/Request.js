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
    // userId: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: [true, "UserId is required"],
    //   },
    // ],

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
      security_deposit: {
        type: Number,
        required: [true, "Security Deposit is required"],
      },
      smoke_drink: {
        type: Array,
        // enum: ["smoke", "drink", "no"],
        required: [true, "Smoke/Drink must be smoke, drink, no"],
      },
      accommodatePets: {
        type: String,
        enum: ["yes", "no"],
        required: [true, "select yes or no"],
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
        type: String,
        enum: ["Furnished Room", "Unfurnished Room", "Private Room"],
        required: [true, "Please select preferred amenities"],
      },
      additional_note: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
// RequestSchema.path("request_details").validate(function (value) {
//   if (value.accommodatePets === "yes") {
//     return value.numberOfCats && value.numberOfDogs;
//   }
//   return true;
// }, 'If accommodatePets is "yes", numberOfCats and numberOfDogs are required.');

module.exports = mongoose.model("Request", RequestSchema);
