import { Request, Response } from "express";
import Branch from "../model/Branch";

export const getBranchOfClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const data = await Branch.find({ client_id: id });
  console.log(data);
  if (!data) return res.status(500).json("no data");
  else res.status(200).send(data);
};

export const getBranch = async (req: Request, res: Response) => {
  const data = await Branch.find().populate("client_id", "company_name");
  if (!data) res.status(500).json({ error_msg: "Some error occurred!" });
  else res.status(200).json(data);
};

export const createBranch = (req: Request, res: Response) => {
  // console.log(req.body);
  const newBranch = new Branch(req.body);
  newBranch
    .save()
    .then((branch) =>
      res.status(201).json({ success_msg: "New Branch created successfully!" })
    )
    .catch((err) => res.status(401).json({ error_msg: err.message }));
};

export const updateBranch = (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;

  Branch.findByIdAndUpdate(id, { $set: newData })
    .then((branch) => {
      res.status(200).json({ success_msg: "Branch Updated Successfully!" });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

export const deleteBranch = (req: Request, res: Response) => {
  const { id } = req.params;

  Branch.findByIdAndDelete(id)
    .then((branch) => {
      res.status(200).json({ success_msg: "Branch Deleted Successfully!" });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
