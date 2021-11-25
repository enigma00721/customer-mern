import express,{ Request, Response} from 'express';
import Contract from '../model/Contract';

export const getContracts = (req: Request, res: Response)=>{
    Contract.find().populate('client_id','company_name')
        .then((contract) => res.status(200).json(contract))
        .catch((err) => res.status(500).json(err.message));
}

export const createContract = (req: Request, res: Response):void => { 
    console.log(req.body);

    const newContract = new Contract(req.body);
    newContract.save()
        .then((contract) => {res.status(202).json({success_msg:'Contract created successfully!'})})
        .catch((err) => {res.status(500).json(err.message)});
}

export const updateContract = (req: Request, res: Response)=>{
    Contract.findByIdAndUpdate(req.params.id , {$set: req.body})
        .then((contract) => { res.status(202).json({ success_msg: 'Contract created successfully!' }) })
        .catch((err) => { res.status(500).json(err.message) });
}

export const deleteContract = (req: Request, res: Response)=>{
    
    Contract.findByIdAndDelete(req.params.id)
        .then((contract) => res.status(200).json({success_msg:'Contract deleted successfully!'}))
        .catch((err) => res.status(500).json(err.message));
}