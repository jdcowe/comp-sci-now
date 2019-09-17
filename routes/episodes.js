const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Episode = require("../models/Episode");
const User = require("../models/User");

// @Route   POST routes/episodes
// @Desc    Add an Episode
// @Access  Private

router.post(
  "/",
  [
    auth,
    [
      check("episodenumber", "Episode Number is Required")
        .not()
        .isEmpty(),
      check("title", "Episode Title is Required")
        .not()
        .isEmpty(),
      check("src", "File Source is required")
        .not()
        .isEmpty(),
      check("content", "Episode Body is Required")
        .not()
        .isEmpty(),
      check("shortcontent", "Episode description is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      let cover = "";

      if (req.body.cover) {
        cover = req.body.cover;
      }

      if (user.role === "admin") {
        const newEpisode = new Episode({
          episodenumber: req.body.episodenumber,
          title: req.body.title,
          src: req.body.src,
          content: req.body.content,
          shortcontent: req.body.shortcontent,
          cover: cover
        });

        const episode = await newEpisode.save();

        return response.json(episode);
      }
      return response.status(400).send("Unauthorized user");
    } catch (error) {
      console.error(error.message);
      response.status(500).send("Server Error");
    }
  }
);

// @Route   GET routes/episodes
// @Desc    Get all episodes
// @Access  Public

router.get("/", async (request, response) => {
  try {
    const episodes = await Episode.find().sort({ episodenumber: 1 });
    response.json(episodes);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
