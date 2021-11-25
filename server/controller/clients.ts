import express,{Request,Response} from 'express';
import Client from '../model/Client';


export const getClients = async (req: Request, res: Response):void => {
    // console.log('in controller inside client');
    const allClients = await Client.find();
    res.status(200).json(allClients);
}

export const getClientsName =  async (req: Request, res: Response) => {
    const allClients = await Client.find({}).select('company_name');
    res.status(200).json(allClients);
}
// export const getClientsName =  (req: Request, res: Response):void => {

//     Client.find({}).select('company_name')
//         .then((errs:any,clients:Response) => {
//             if(errs) return res.json(errs);
//             res.status(200).json(clients);
//         });
// }

export const createClient = (req: Request, res: Response):void => {
    // console.log(req.body);
    const newCLient = new Client(req.body);
    newCLient.save()
        .then((client) =>res.status(201).json({success_msg:'New Client created successfully!'}))
        .catch((err) => res.status(401).json({error_msg: err.message}));
}


// ------------------- update client-------------------
export const updateClient = (req: Request, res: Response):void => {
    const {id} = req.params;
    const newData = req.body;
    console.log(newData);

    Client.findByIdAndUpdate(id , { $set: newData })
        .then((client) => {res.status(202).json({success_msg: 'Client updated successfully'})})
        .catch((err) => {res.status(500).json({error_msg: err.message}) });
}

// ------------------ delete client--------------------
export const deleteClient = (req: Request, res: Response):void => {

    const {id} = req.params;

    Client.findByIdAndDelete(id)
        .then((client) => res.status(200).json({ success_msg: 'Delete Successfull!'}))
        .catch((err) => res.status(500).json({error_msg: err.message}));

}