const express = require("express"),
  router = express.Router(),
  restaurantModel = require("../models/restaurantModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const data = await restaurantModel.getAllRestaurants();

  res.render("template", {
    locals: {
      title: "Restaurant List",
      data: data,
      is_logged_in: req.session.is_logged_in,
    },
    partials: {
      partial: "partial-index",
    },
  });
});

/* We want to load ane entirely different partial for a single restaurant,
so we can add a new router.get() method, rather than going into conditional hell */

router.get("/:slug", async function (req, res) {
  const { slug } = req.params;
  console.log("slug is: ", slug);
  const data = await restaurantModel.getRestaurantBySlug(slug);
  const reviewList = await restaurantModel.getReviewsByRestaurantId(data.id);

  res.render("template", {
    locals: {
      title: data.name,
      data,
      reviewList,
      is_logged_in: req.session.is_logged_in,
    },
    partials: {
      partial: "partial-single",
    },
  });
});

router.post("/", async function (req, res) {
  const { restaurant_id, review_title, review_text } = req.body;
  const idAsInt = parseInt(restaurant_id);

  const postData = await restaurantModel.addReview(
    idAsInt,
    review_title,
    review_text
  );
  console.log(postData);
  res.sendStatus(200);
});

module.exports = router;
