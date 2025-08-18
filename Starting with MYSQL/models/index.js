const Student = require("../models/students");
const Post = require("../models/posts");

Student.hasMany(Post);
Post.belongsTo(Student);

module.exports = {
  Student,
  Post,
};
