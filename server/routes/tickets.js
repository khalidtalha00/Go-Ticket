const router = require('express').Router();
const Ticket = require('../models/Ticket');

// Create Ticket
router.post('/', async (req, res) => {
  const newTicket = new Ticket(req.body);
  try {
    const savedTicket = await newTicket.save();
    res.status(200).json(savedTicket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User Tickets
router.get('/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Ticket
router.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json("Ticket has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
