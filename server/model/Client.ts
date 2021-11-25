import mongoose from 'mongoose';
const {Schema} = mongoose;


const clientSchema = new Schema({

    client_name:{type: String , required: true},
    company_name:{type: String , required: true},
    company_address:{type: String , required: true},
    phone:{type: Number , required: true},
    email:{type: String , required: true},

})

export default mongoose.model('Client' , clientSchema);