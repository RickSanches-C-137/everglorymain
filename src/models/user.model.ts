import { Schema, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new Schema<IUser>({
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String }
})

const User = model<IUser>('User', userSchema);
export default User 