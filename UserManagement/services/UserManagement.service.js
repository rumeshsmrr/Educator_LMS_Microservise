const User = require("../models/User");

class UserManagementService {
  async updateUserByID(user) {
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser;
  }

  async getCoursesOfUser(id) {
    try {
      if (!id) {
        throw new Error("User ID is required");
      }
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new Error("User not found");
      }

      const courses = user.courses.map((course) => course.course);

      return courses;
    } catch (error) {
      throw new Error(`Error fetching courses of user: ${error.message}`);
    }
  }

  async getUserByID(id) {
    const user = await User.findById(id);
    return user;
  }

  async getStudentsByCid(courseId) {
    const users = await User.find({
      "courses.course": courseId,
      role: "student",
    });
    return users;
  }

  async countUsersInCourse(courseID) {
    const count = await User.countDocuments({
      "courses.course": courseID,
      role: "student",
    });
    return count;
  }

  async verifyInstructorPermission(iid) {
    const user = await User.findById(iid);

    if (user && user.role == "instructor") return true;
    else return false;
  }

  async eventHandler(payload) {
    try {
      switch (payload.event) {
        case "GET_USER": {
          return this.getUserByID(payload.id);
        }
        case "UPDATE_USER":
          return this.updateUserByID(payload.user);
        case "GET_STUDENT_COUNT":
          return this.countUsersInCourse(payload.cid);
        case "GET_STUDENTS":
          return this.getStudentsByCid(payload.cid);
        case "INSTRUCTOR_PERMISSION":
          return this.verifyInstructorPermission(payload.iid);
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserManagementService;
