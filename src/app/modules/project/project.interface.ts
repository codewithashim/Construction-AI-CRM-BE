import { Model } from 'mongoose';

/**
 * Represents the client's company information
 */
export interface ICompany {
    name?: string;
    address?: string;
    gstNumber?: string;
}

/**
 * Represents the client information for a project
 */
export interface IClient {
    name?: string;
    mobileNumber?: string;
    company?: ICompany;
}

/**
 * Represents the structure of a project
 */
export interface IProject {
    projectName?: string;
    address?: string;
    city?: string;
    location?: string;
    startDate?: string; // ISO 8601 format (YYYY-MM-DD)
    endDate?: string; // ISO 8601 format (YYYY-MM-DD)
    partiesInvolved?: string[]; // Store only party IDs
    client?: IClient;
}

/**
 * Represents the possible filters for querying projects
 */
export interface IProjectFilters {
    searchTerm?: string;
    projectName?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
}

export type ProjectModel = Model<IProject, Record<string, unknown>>;
