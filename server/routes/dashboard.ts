import express from "express";
import Branch from "../model/Branch";
import Client from "../model/Client";
import Contract from "../model/Contract";
import ContactPerson from "../model/ContactPerson";

const router = express.Router();

router.get("/getDashboardData", async (req, res) => {
  const branchCount = await Branch.countDocuments().exec();
  const clientCount = await Client.countDocuments().exec();
  const contractCount = await Contract.countDocuments().exec();
  const contactCount = await ContactPerson.countDocuments().exec();
  res.json({ branchCount, clientCount, contractCount, contactCount });
});

export default router;
