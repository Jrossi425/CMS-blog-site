const router = require("express").Router();
const { User, Blogpost } = require("../../models");
const withAuth = require("../../utilities/auth");

// GET all blogposts for homepage
router.get("/", async (req, res) => {
  try {
    const blogpostsData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogposts = blogpostsData.map((post) => post.get({ plain: true }));
console.log(blogposts)
    res.render("home", {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get a single blogpost by id for blogpost page and include the username of the user who created the blogpost
// If the user is not logged in, redirect to the login page
router.get("/blogpost/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    const blogpost = blogpostData.get({ plain: true });
    console.log(blogpost);
    res.render("blogpost", {
      blogpost,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// render the login.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("users_login");
});

// render the signup.handlebars page if the user is not logged in and redirect to the homepage if they are logged in already
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("users_create_account");
});

// render the dashboard.handlebars page if the user is logged in and redirect to the login page if they are not logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

// render the edit.handlebars page if the user is logged in and redirect to the login page if they are not logged in
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    const blogpost = blogpostData.get({ plain: true });
    console.log(blogpost);
    res.render("edit", {
      blogpost,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
})