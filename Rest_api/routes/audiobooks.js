const express = require("express");
const router = express.Router();
const Audiobook = require("../models/audiobooks");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require('file-system');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {

    var dir = "./uploads/audiobook"

    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    cb(null, dir);
  },
   filename: function(req, file, cb) {
     cb(null, Date.now() + file.originalname);
   }

});



const upload = multer({storage: storage});


router.get("/", (req, res, next) => {
  Audiobook.find()

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
            url: "https://aleph-server.vercel.app/audiobooks" + doc._id
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

router.post("/", upload.fields([{name: 'audio', maxcount: 1}, {name: 'srtfile', maxcount: 1}]), (req, res, next)=>{

  console.log(req.files);
  const audiobook = new Audiobook ({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    category: req.body.category,
    audio: req.files['audio'][0].path,
    srtfile: req.files['srtfile'][0].path,  

  });

  audiobook

  .save()

  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "audiobook was created.",
      createdAudiobook: {
        title: result.title,
        description: result.description,
        author: result.author,
        category: result.category,
        audio: req.files['audio'][0].originalname,
        srtfile: req.files['srtfile'][0].originalname,
        views: result.views,
        _id: result._id,
        request: {
          type: "GET",
          url: "https://aleph-server.vercel.app/audiobooks" + result._id
        }
      }
    });
  })

  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });

});

router.get("/:bookID", (req, res, next) => {


  const id = req.params.bookID;

  Audiobook.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, {new: true })

  .select("title description author _id category audio srt views")
  .exec()

  .then(doc => {
    console.log("From Database", doc);
    if (doc) {
      res.status(200).json({
        audiobook: doc,
        request: {
          type: "GET",
          url: "https://aleph-server.vercel.app/audiobooks"
        }
      });
    } else {
      res.status(404).json({
        message: "No valid entry found for provided audiobook ID."
      });
    }



  })

  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.patch("/:bookID", (req, res, next) => {
  const id = req.params.bookID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Audiobook.update({ _id: id }, { $set: updateOps })

  .exec()
  .then(result => {
    res.status(200).json({
      message: "Audiobook updated!",
      request: {
        type: "GET",
        url: "https://aleph-server.vercel.app/audiobooks" + id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:bookID", (req, res, next) => {
  const id = req.params.bookID;
  Audiobook.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Audiobook deleted!",
      request: {
        type: "POST",
        url: "https://aleph-server.vercel.app/audiobooks",
        body: { title: "String", description: "String", author: "String" }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;