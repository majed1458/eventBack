
const Event = require("../models/Event-model");
const path = require("path")

//---------------------------------------------------------------------------
// @desc    create an event
// @route   POST /api/event/create

const createEvent = async (req, res) => {
    try {
        const { Title, Description, DateEven, Address } = req.body;

        if (
            !Title ||
            !Description ||
            !DateEven ||
            !Address
        ) {
            return res
                .status(406)
                .json({ Message: "Please provide all required informations." });
        }


        const newEvent = new Event({
            Title: Title,
            Description: Description,
            Date: new Date(DateEven),
            Address: Address,

        });

        await newEvent.save();


        return res.status(201).json({ newEvent });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};
//---------------------------------------------------------------------------
// @desc    set immage to event
// @route   PUT /api/event/update/:id

const modifyEvent = async (req, res) => {
    try {
        const { Title, Description, DateEven, Address } = req.body;
        const { id } = req.params

        if (
            !Title ||
            !Description ||
            !DateEven ||
            !Address
        ) {
            return res
                .status(406)
                .json({ Message: "Please provide all required informations." });
        }
        const existingEvent = await Event.findOneAndUpdate({ _id: id }, { Title, Description, Date: DateEven, Address })
        if (!existingEvent) {
            return res
                .status(406)
                .json({ Message: "there is no event with that id" });
        }

        return res.status(201).json({ existingEvent });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};
//---------------------------------------------------------------------------
// @desc    set immage to event
// @route   PUT /api/event/addImmage/:id

const addImmageToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(406).json({ Message: "Missing required event id" });
        }
        console.log(req.file)
        console.log(req.params)
        const eventToAddImage = await Event.findOneAndUpdate({ _id: id }, { Image: req.file.filename })
        console.log(eventToAddImage)
        if (!eventToAddImage) {
            return res.status(406).json({ Message: "the event dosen t exist" });
        }
        return res.status(201).json(eventToAddImage);
    } catch (err) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}
//---------------------------------------------------------------------------
// @desc    delete an event
// @route   DELETE /api/event/delete/:id

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(406).json({ Message: "Missing required event Id" });
        }
        // **Check if the event exists
        const getEvent = await Event.findOne({ _id: id });
        if (!getEvent) {
            return res.status(406).json({ Message: "Event doesn't exist" });
        }
        // **Delete the event
        const deleteEvent = await Event.deleteOne({ _id: id });
        if (!deleteEvent) {
            return res.status(400).json({ Message: "Event doesn't exist" });
        }
        return res.status(200).json({ Message: "Event deleted successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};



//-------------------------------------------------------------------------
// @desc    get all events
// @route   GET /api/event/allEvents

const getAllEvents = async (req, res) => {
    try {


        const sortBy = req.query.sortBy || "default";
        let sortSetting = {};
        switch (String(sortBy)) {
            case "newest":
                sortSetting = { createdAt: -1 };
                break;
            case "oldest":
                sortSetting = { createdAt: 1 };
                break;
            default:
                sortSetting = {
                    createdAt: 1
                };
        }
        const items = await Event.find().sort(sortSetting)
        return res.status(200).json({
            Message: "Retrived successfully",
            items,

        });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};
//---------------------------------------------------------------------------
module.exports = {
    createEvent,
    addImmageToEvent,
    getAllEvents,
    deleteEvent,
    modifyEvent

};
