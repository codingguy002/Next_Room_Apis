const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      max: 40,
    },
    property_type: {
      type: String,
      required: [true, "Property type is required"],
    },
    property_details: {
      // {
      room: {
        type: Number,
        required: [true, "Number of room is required"],
      },
      landlord: {
        type: String,
        required: [true, "Landlord is required"],
      },
      bathroom: {
        type: Number,
        required: [true, "Number of Bathroom is required"],
      },
      bathroom_type: {
        type: String,
        required: [true, "Bathroom type is required"],
      },
      furnished_type: {
        type: String,
        required: [true, "Furnished Type is required"],
        enum: ["yes", "no"], // define the roles available in your system
      },
      utilities_included: {
        type: String,
        required: [true, "Utilities is required"],
      },
      roommates: {
        male: {
          type: Number,
          required: [true, "Number of Male is required"],
        },
        female: {
          type: Number,
          required: [true, "Number of Female is required"],
        },
      },
      // },
    },
    address: {
      type: String,
      max: 50,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    zip_code: {
      type: String,
      required: [true, "Zip code is required"],
    },
    security_deposit: {
      type: Number,
      required: [true, "Security Deposit is required"],
    },
    rent: {
      amount: { type: Number, required: [true, "Rent is required"] },
      time: {
        type: String,
        enum: ["weekly", "monthly"],
        required: [true, "Time must be Weekly or Monthly"],
      },
    },
    lease: {
      type: String,
      required: [true, "Lease is required"],
    },
    availableFrom: {
      type: Date,
      required: [true, "select date of availability is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    facilities: {
        laundry_type: {
          type: String,
          required: [true, "Laundry Type is required"],
        },
        parking_type: {
          type: String,
          required: [true, "Parking Type is required"],
        },
        cat_friendly: {
          type: String,
          required: [true, "Select Cat friendly is required"],
        },
        dog_friendly: {
          type: String,
          required: [true, "Select Dog friendly is required"],
        },
        cannabis_friendly: {
          type: String,
          required: true,
          required: [true, "Select Cannabis friendly is required"],
        },
        children_friendly: {
          type: String,
          required: [true, "Select Children friendly is required"],
        },
      },
    image: {
      type: Array,
      required: [true, "Image is required"],
    },
    status: {
      type: String,
      enum: ["active", "rented", "inactive"],
      default: "active",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
