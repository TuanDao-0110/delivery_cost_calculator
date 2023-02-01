import express, { Response, Request } from "express";
import { calculateDeliveryFee } from "../config/calculator";
const router = express.Router();

router.post("/api/delivery_fee", async (req: Request, res: Response) => {
  try {
    const { cartDetails } = req.body;
    const delivery_fee = calculateDeliveryFee(cartDetails);
    return res.status(200).json({ msg: "ok", delivery_fee });
  } catch (error) {
    res.status(400).send(error);
  }
});

export { router as calculate_router };
