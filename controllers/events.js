const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();

    res.json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Does not exist an event by that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "The user has not access to modify this event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Server Error",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Does not exist an event by that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "The user has not access to delete this event",
      });
    }

    await Event.findByIdAndRemove(eventId);

    res.json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
