import express, { RequestHandler } from "express";
import ContactPerson from "../model/ContactPerson";

export const getContacts: RequestHandler = async (req, res) => {
  const data = await ContactPerson.find()
    .populate("client_id", "company_name")
    .populate("branch_id", "address");
  if (!data) res.status(500).json({ error_msg: "Some error occurred!" });
  else res.status(200).json(data);
};

export const createContact: RequestHandler = (req, res) => {
  console.log(req.body);
  const newData = new ContactPerson(req.body);
  newData
    .save()
    .then((contact) =>
      res
        .status(201)
        .json({ success_msg: "New Contact Person created successfully!" })
    )
    .catch((err) => res.status(401).json({ error_msg: err.message }));
};

export const updateContact: RequestHandler = (req, res) => {
  if (!("branch_id" in req.body)) req.body.branch_id = null;
  ContactPerson.findByIdAndUpdate(req.params.id, req.body)
    .then((data) =>
      res
        .status(200)
        .json({ success_msg: "Contact Person updated successfully!" })
    )
    .catch((err) => res.status(500).json({ error_msg: err.message }));
};

export const deleteContact: RequestHandler = (req, res) => {
  const { id } = req.params;
  ContactPerson.findByIdAndDelete(id)
    .then((contact) =>
      res
        .status(200)
        .json({ success_msg: "Contact Person deleted successfully" })
    )
    .catch((err) => res.status(500).json({ error_msg: err.message }));
};
