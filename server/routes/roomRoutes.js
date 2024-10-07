const express = require('express');
const { getAllRooms, createRoom, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomController');
const router = express.Router();

router.get('/', getAllRooms);
router.post('/', createRoom);
router.get('/:id', getRoomById);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
