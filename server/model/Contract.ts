import mongoose from 'mongoose';
const {Schema} = mongoose;

const contractSchema = new Schema({

    contract_sign_date: {type: Date , required: true},
    contract_end_date: {type: Date , required: true},
    payment_status: {type: String , required: true},

    // foreign key reference
    client_id: { type: Schema.Types.ObjectId , required: true , ref:'Client'}

});

export default mongoose.model('Contract' , contractSchema);