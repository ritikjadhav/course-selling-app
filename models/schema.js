const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ritiksjadhav:<password>@cluster0.h9yfro6.mongodb.net/"
  )
  .then(() => {
    console.log("database connected");
  });

const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("adminModel", AdminSchema);
const Course = mongoose.model("courseModel", CourseSchema);

module.exports = {
  Admin,
  Course,
};
