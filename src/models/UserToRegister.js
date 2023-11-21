import { Schema, model } from 'mongoose';

const userToRegisterSchema = new Schema({
    codeVerification: {
        type: String,
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    token: {
        type: String,
        required: true,
        unique: false
    },
    expirationDate: {
        type: Date,
        required: true,
        unique: false
    }
},
{ timestamps: true }
);

userToRegisterSchema.index({ "expirationDate": 1 }, { expireAfterSeconds: 0 });

const UserToRegister = model('UserToRegister', userToRegisterSchema);

export default UserToRegister;
