import mongoose from 'mongoose';
const { Schema } = mongoose;

const branchSchema = new Schema({

    address:{type: String , required: true},

    client_id : {
        type: Schema.Types.ObjectId,
        ref:'Client',
        required: true,
    }

    
});

export default mongoose.model('Branch', branchSchema);