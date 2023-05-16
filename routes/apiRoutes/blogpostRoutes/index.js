const router = require("express").Router();
const { Blogpost, User } = require("../../../models");

// get all blogposts
router.get("/", async (req, res) => {
  try {
    const blogpostData = await Post.findAll({
      // include associated user data
      include: [{ User }],
    });
    res.status(200).json(blogpostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single blogpost
router.get("/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      // include associated user data
      include: [{ User }],
    });
    if (!blogpostData) {
      res.status(400).json({ message: "No blogpost found with that id!" });
      return;
    }
    res.json(blogpostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new blogpost
router.post("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.create({
      ...req.body,
      // associate new blogpost with logged in user
      user_id: req.session.user.id,
    });
    res.json(blogpostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update a blogpost by id
router.put("/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.update(
      {
      title: req.body.title,
      content: req.body.content,
     },
      {
      where: {
        id: req.params.id,
      },
    });
    if (!blogpostData) {
      res.status(400).json({ message: "No blogpost found with that id!" });
      return;
    }
    res.json(blogpostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a blogpost by id
router.delete("/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogpostData) {
      res.status(400).json({ message: "No blogpost found with that id!" });
      return;
    }
    res.json(blogpostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
