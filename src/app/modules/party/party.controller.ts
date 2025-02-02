import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/utils/catch-async';
import sendResponse from '../../../shared/utils/send-response';
import { PartyService } from './party.service';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';
import { IParty } from './party.interfce';

const createParty = catchAsync(async (req: Request, res: Response) => {
    const party = await PartyService.createParty(req.body);
    sendResponse<IParty>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: apiResponseMessage.PARTIES.CREATE_SUCCESS,
        data: party,
    });
});

const getAllParties = catchAsync(async (req: Request, res: Response) => {
    const parties = await PartyService.getAllParties(req.query);
    sendResponse<IParty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.PARTIES.FETCH_SUCCESS,
        data: parties,
    });
});

const getPartyById = catchAsync(async (req: Request, res: Response) => {
    const party = await PartyService.getPartyById(req.params.id);
    sendResponse<IParty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.PARTIES.FETCH_SINGLE_SUCCESS,
        data: party,
    });
});

const updateParty = catchAsync(async (req: Request, res: Response) => {
    const party = await PartyService.updateParty(req.params.id, req.body);
    sendResponse<IParty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.PARTIES.UPDATE_SUCCESS,
        data: party,
    });
});

const deleteParty = catchAsync(async (req: Request, res: Response) => {
    const party = await PartyService.deleteParty(req.params.id);
    sendResponse<IParty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.PARTIES.DELETE_SUCCESS,
        data: party,
    });
});

export const PartyController = {
    createParty,
    getAllParties,
    getPartyById,
    updateParty,
    deleteParty,
};
