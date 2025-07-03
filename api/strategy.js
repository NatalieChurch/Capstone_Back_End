import express from "express"
import { getStrategy } from "../db/queries/strategy.js"
const router = express.Router()
export default router

router.route('/').get(async(req, res, next)=>{
    const { players_hand, dealers_upcard, hand_type } = req.body;

    if (!players_hand || !dealers_upcard || !hand_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const action = await getStrategy({players_hand, dealers_upcard, hand_type})
    res.status(200).json(action)
})