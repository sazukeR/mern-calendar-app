const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { isDate } = require("../helpers/isDate");

const router = Router();

// CALENDAR EVENTS CRUD
// HOST + /API/EVENTS

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
