import ApiError from '../../../shared/errors/api-error';
import httpStatus from 'http-status';
import paginationPick from '../../../shared/utils/pagination-pick';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';
import { IParty, IPartyFilters } from './party.interfce';
import { Party } from './party.models';

const createParty = async (payload: IParty): Promise<IParty> => {
    try {
        const party = await Party.create(payload);
        return party;
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

const getAllParties = async (
    queryParams: Record<string, unknown>,
): Promise<IParty[]> => {
    try {
        const filters = paginationPick(queryParams, [
            'searchTerm',
            'name',
            'type',
        ]) as IPartyFilters;
        const { searchTerm, ...filterData } = filters;
        const andConditions = [];

        if (searchTerm) {
            andConditions.push({
                $or: ['name', 'email', 'phone'].map((field) => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }

        if (Object.keys(filterData).length) {
            andConditions.push({
                $and: Object.entries(filterData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }

        const whereConditions =
            andConditions.length > 0 ? { $and: andConditions } : {};

        const parties = await Party.find(whereConditions);
        return parties;
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

const getPartyById = async (id: string): Promise<IParty> => {
    try {
        const party = await Party.findById(id);
        if (!party) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PARTIES.NOT_FOUND,
            );
        }
        return party;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

const updateParty = async (
    id: string,
    payload: Partial<IParty>,
): Promise<IParty> => {
    try {
        const party = await Party.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        if (!party) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PARTIES.NOT_FOUND,
            );
        }
        return party;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

const deleteParty = async (id: string): Promise<IParty> => {
    try {
        const party = await Party.findByIdAndDelete(id);
        if (!party) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PARTIES.NOT_FOUND,
            );
        }
        return party;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

export const PartyService = {
    createParty,
    getAllParties,
    getPartyById,
    updateParty,
    deleteParty,
};
