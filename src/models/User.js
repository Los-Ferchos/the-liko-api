import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

  
const User = model('users', UserSchema);
export default User;