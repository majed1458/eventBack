
const Event = require("../models/Event-model");
const path = require("path")

//---------------------------------------------------------------------------
// @desc    create an event
// @route   POST /api/event/create

const createEvent = async (req, res) => {
    try {
        const {title,description,date,address} = req.body;

        if (
            !title ||
            !description ||
            !date ||
            !address
            ) {
            return res
                .status(406)
                .json({ Message: "Please provide all required informations." });
        }
       
  
        const newEvent = new Event({
            Title:title,
            Description:description,
            Date:new Date(date),
            Address:address
        });
        await newEvent.save();
       
        return res.status(201).json({ Message: "event created successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};

//---------------------------------------------------------------------------
// @desc    set order informations
// @route   PUT /api/order/update/replie/:_id
// @access  private
// @Role    supplier
const addImmageToEvent=async (req,res)=>{
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(406).json({ Message: "Missing required event id" });
        }
        console.log(req.file)
        const eventToAddImage=await Event.findOneAndUpdate({id},{Image:req.file.filename})
        if (!eventToAddImage) {
            return res.status(406).json({ Message: "the event dosen t exist" });
        }
        return res.status(201).json({ Message: "event created successfully" });
    }catch(err){
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}
//---------------------------------------------------------------------------
// @desc    delete an order
// @route   DELETE /api/order/delete/:_id
// @access  private
// @Role    archived
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(406).json({ Message: "Missing required event Id" });
        }
        // **Check if the order exists
        const getEvent = await Event.findOne({ _id:id });
        if (!getEvent) {
            return res.status(406).json({ Message: "Event doesn't exist" });
        }
        // **Delete the order
        const deleteEvent = await Event.remove({  _id:id});
        if (!deleteEvent) {
            return res.status(400).json({ Message: "Event doesn't exist" });
        }
        return res.status(200).json({ Message: "Event deleted successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};
//---------------------------------------------------------------------------
// @desc    get one order
// @route   DELETE /api/order/one/:_buyerId
// @access  private
// @Role    all roles
const getOneEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(406).json({ Message: "Missing required event id" });
        }
        const getEvent = await Order.findOne({ _id:id });
        if (!getEvent) {
            return res.status(400).json({ Message: "event doesn't exist" });
        }
        return res
            .status(200)
            .json({ Message: "event retrived successfully", event: getEvent });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


//-------------------------------------------------------------------------
// @desc    get all orders
// @route   GET /api/order/buyer/:_buyerId
// @access  private
// @Role    admin
const getAllEvents = async (req, res) => {
    try {
        const page = req.query.p || 0;
        const limit = req.query.l || 10;
        const count = (await Event.find()).length;
        const items = await Event.find()
            .skip(page * limit)
            .limit(limit);
        return res.status(200).json({
            Message: "Retrived successfully",
            count,
            items,
            size: items.length,
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
    getOneEvent
};
