const express = require('express');
const router = express.Router();

const { getAllEvents, getEventById, getEventByName, createEvent } = require('../../controllers/eventController');
const { validateEvent } = require('../../validators/eventValidator');
const handleValidationErrors = require('../../middleware/validationMiddleware');

// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date-time
 *               date_end:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               reminder:
 *                 type: integer
 *               max_additional_guests:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', validateEvent, handleValidationErrors, createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date-time
 *               date_end:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               reminder:
 *                 type: integer
 *               max_additional_guests:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', deleteEvent);

/**
 * @swagger
 * /events/name/{name}:
 *   get:
 *     summary: Retrieve events with names containing the search term
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching events
 *       404:
 *         description: No matching events found
 *       500:
 *         description: Internal server error
 */
router.get('/name/:name', getEventByName);

/**
 * @swagger
 * /events/location/{location}:
 *   get:
 *     summary: Retrieve events with locations containing the search term
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching events
 *       404:
 *         description: No matching events found
 *       500:
 *         description: Internal server error
 */
router.get('/location/:location', getEventByLocation);

module.exports = router;