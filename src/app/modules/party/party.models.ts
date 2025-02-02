import mongoose, { Schema } from 'mongoose';
import { IParty, PartyModel } from './party.interfce';

/**
 * Mongoose schema for GST information
 */
const gstSchema = new Schema({
    gst: { type: String },
    legalBusinessName: { type: String },
    billingAddress: { type: String },
});

/**
 * Mongoose schema for party ID
 */
const partyIdSchema = new Schema({
    prefix: { type: String },
    sequence: { type: Number },
});

/**
 * Mongoose schema for Party
 */
const partySchema = new Schema<IParty>(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        type: { type: String },
        openingBalance: { type: Number },
        bankAccount: { type: String },
        gst: { type: gstSchema },
        partyId: { type: partyIdSchema },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

export const Party = mongoose.model<IParty, PartyModel>('Party', partySchema);
