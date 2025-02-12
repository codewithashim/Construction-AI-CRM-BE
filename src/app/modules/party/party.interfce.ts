import { Model } from 'mongoose';

export interface IGst {
    gst: string;
    legalBusinessName: string;
    billingAddress: string;
}

export interface IPartyId {
    prefix: string;
    sequence: number;
}

export interface IParty {
    name: string;
    phone: string;
    email: string;
    type: string;
    openingBalance: number;
    bankAccount: string;
    gst: IGst;
    partyId: IPartyId;
}

export interface IPartyFilters {
    searchTerm?: string;
    name?: string;
    type?: string;
}

export type PartyModel = Model<IParty, Record<string, unknown>>;
