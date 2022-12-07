const express = require("express");
const path = require("path")

const { createEvent, addImmageToEvent, getAllEvents } = require("../controllers/Event-Controller")
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}--${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})

router.post("/create", createEvent);
router.get("/allEvents", getAllEvents)
router.put("/addImg/:id", upload.single("event_img"), addImmageToEvent)
module.exports = router;