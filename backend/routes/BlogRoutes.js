const express = require("express");

const BlogModel = require("../model/BlogModel");
const auth= require("../MiddleWare/auth")

const BlogRoute = express.Router();

BlogRoute.use(auth)

//==============================================================================>

BlogRoute.post("/blogs", async function (req, res) {
  try {
    const blog = new BlogModel({ ...req.body });
    await blog.save();

    return res.status(200).send({
      message: "New Blog has been posted Successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//====================================================================================================>

BlogRoute.get("/blogs", async function (req, res) {
  try {
    const { title, category, sort, order } = req.query;

    let obj = {};

    if (title) {
      obj.title = { $regex: title, $options: "i" };
    }
    if (category) {
      obj.category = category;
    }

    let sortobj = {};
    if (sort) {
      if (order == "asc") {
        sortobj[sort] = 1;
      } else if (order == "desc") {
        sortobj[sort] = -1;
      }
    }

    const blog = await BlogModel.find(obj).sort(sortobj);
    return res.status(200).send({
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//==============================================================================>

BlogRoute.patch("/blogs/:id", async function (req, res) {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedBlog) {
      return res.status(404).json({
        msg: "Blog not found.",
      });
    }

    return res.status(200).send({
      message: " Blog has been updated Successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//=============================================================================================================================================================================================================>

BlogRoute.delete("/blogs/:id", async function (req, res) {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        msg: "Blog not found.",
      });
    }

    return res.status(200).send({
      message: " Blog has been deleted Successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//=============================================================================================================================================================================>

BlogRoute.patch("/blogs/:id/like", async function (req, res) {
  try {
    const blog = await BlogModel.findById(req.params.id);

    blog.likes = blog.likes + 1;
    await blog.save();
    return res.status(200).send({
      message: " Blog has been liked.",
    });
  } catch (error) {
    return res.status(200).send({
      message: error.message,
    });
  }
});

//=====================================================================================================================================================>

BlogRoute.patch("/blogs/:id/comment", async function (req, res) {
  try {
    const blog = await BlogModel.findById(req.params.id);

    const newcomment = {
      username: req.body.username,
      content: req.body.content,
    };

    blog.comments.push(newcomment);
    await blog.save();

    return res.status(200).send({
      message: " Comment has been added.",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = BlogRoute;
