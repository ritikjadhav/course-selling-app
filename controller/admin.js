const { Admin, Course } = require("../models/schema");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { validAdmin, validCourse } = require("../models/validator");
const z = require("zod");

exports.signUp = async (req, res) => {
  try {
    // Creates a new admin account
    // Check if the admin already exists
    const { username, password } = req.body;

    validAdmin.parse({ username, password });

    const existingUser = await Admin.findOne({ username });
    if (!existingUser) {
      await Admin.create({ username, password });

      res.status(200).json({
        message: "Admin created successfully",
      });
    } else {
      res.status(400).json({
        message: "Admin already exist",
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      });
    }
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({ username, password });

    if (existingUser) {
      const token = jwt.sign({ username }, JWT_SECRET);

      res.status(200).json({
        token: token,
      });
    } else {
      res.json({
        message: "Admin doesnt exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addCourses = async (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;

    validCourse.parse({ title, description, price, imageLink });

    const existingCourse = await Course.findOne({ title });

    if (!existingCourse) {
      const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink,
      });

      res.status(200).json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
    } else {
      res.status(400).json({
        message: "Course already exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    if (courses) {
      res.status(200).json({
        courses: courses,
      });
    } else {
      res.status(400).json({
        message: "No course available",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
