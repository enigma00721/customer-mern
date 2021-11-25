import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactPersonSchema = new Schema({

    name:{type: String , required: true},
    email:{type: String , required: true},
    phone:{type: String , required: true},
    address:{type: String , required: true},

    // foreign key reference to 2 collections

    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },

    branch_id: {
        type: Schema.Types.ObjectId,
        ref:'Branch'
    }

});

export default mongoose.model('ContactPerson', contactPersonSchema);