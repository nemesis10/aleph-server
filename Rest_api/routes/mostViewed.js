const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Audiobook = require("../models/audiobooks");

router.get("/", (req, res, next)=> {

  Audiobook.find().sort({ "views": -1, "title": 1 }).limit(5)
  
  .select("title description author _id audio srtfile category views")
  .exec()

  .then(docs => {
    const response = {
      count: docs.length,
      audiobooks: docs.map(doc=> {
        return {
          title: doc.title,
          description: doc.description,
          author: doc.author,
          category: doc.category,
          audio: doc.audio,
          srtfile: doc.srtfile,
          views: doc.views,
          _id: doc._id,
          request: {
            type: "GET",
            url: "https://aleph-server.vercel.app/audiobooks/" + doc._id
          }
        }
      })
    }
    res.status(200).json(response);
  })

  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});
  


module.exports = router;
