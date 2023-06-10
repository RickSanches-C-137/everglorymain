import { Schema, model } from 'mongoose';

export interface IParcel {
    itemName: string;
    from: string;
    to: string;
    receiver: string;
    currentLocation: string;
    date: string;
    status: string;
    sender: string;
    createdAt: Date;
    updatedAt: Date;
}
const parcelSchema = new Schema<IParcel>({
    itemName: { type: String },
    from: { type: String },
    to: { type: String },
    receiver: { type: String },
    sender: { type: String },
    currentLocation: { type: String },
    date: { type: String },
    status: { type: String },
})

const Parcel = model<IParcel>('Parcel', parcelSchema);
export default Parcel 