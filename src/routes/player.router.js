import express from 'express';
import { getPlayerDetails, getPlayers, createPlayer, updatePlayer, deletePlayer } from '../controllers/player.controller.js';  
import { validatePlayer } from '../validators/index.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get('/', getPlayers);
router.get('/:id/description', getPlayerDetails);
router.post('/', upload.single("image"), validatePlayer, createPlayer);
router.patch('/:id', upload.single("image"), validatePlayer, updatePlayer);
router.delete('/:id', deletePlayer);

export default router;