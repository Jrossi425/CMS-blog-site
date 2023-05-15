const router = require("express").Router();
const { User, Blogpost } = require("../../../models");

// create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

// save the session so that the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData;
      req.session.id = userData.id;

      res.status(200).json(userData);
  });

  
  } catch (error) {
    res.status(400).json(error);
  }
});




// login a user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // if no user found with that username
    console.log(userData)
    if (!userData) {
      res.status(400).json({ message: "No user found with that username!" });
      return;
    }
    // if user found, check password
    const validPassword = await userData.checkPass(req.body.password);
console.log(validPassword)
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // save the session so that the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData;
      req.session.id = userData.id;

      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });

   

  } catch (error) {
    res.status(500).json(error);
  }
});




// logout a user by destroying the session and redirect to homepage
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect("/")
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      // include blogposts by all users when we find all users
        include: [{ Blogpost }],
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});


// find a user by id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      // include blogposts by this user when we find a user
        include: [{ Blogpost }],
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a user by id
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "No user found with that id!" });
      return;
    }
    res.json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
