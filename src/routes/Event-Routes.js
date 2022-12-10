const express = require("express");
const path = require("path")

const { createEvent, addImmageToEvent, getAllEvents,deleteEvent } = require("../controllers/Event-Controller")
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        let f1 =
        cb(null, `${file.originalname}--${Date.now()}${path.extname(file.originalname)}`)
       
    }
})
const upload = multer({
    storage: storage
})

router.post("/create",createEvent);
router.get("/allEvents",getAllEvents)
router.put("/addImmage/:id",upload.single("event_img"),addImmageToEvent)
router.put("update/:id")
router.delete("/delete/:id",deleteEvent)
module.exports = router;