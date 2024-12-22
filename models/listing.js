const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");
const { type } = require("express/lib/response.js");
const { ref } = require("joi");
const imageSchema = new Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true }
  });
  


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url:String,
        filename:String
      
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    geometry:{
        type:{
        type:String,
        enum:['Point'],
        required:true,
    },
    coordinates:{
        type:[Number],
        required:true
    }
  }
});


//delete listing and review middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})



const Listing = mongoose.model("Listing", listingSchema);

//export listingschema
module.exports = Listing;