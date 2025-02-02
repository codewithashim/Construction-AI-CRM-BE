import { IProject, IProjectFilters } from './project.interface';
import { Project } from './project.models';
import ApiError from '../../../shared/errors/api-error';
import httpStatus from 'http-status';
import paginationPick from '../../../shared/utils/pagination-pick';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';
import { projectFilter } from '../../../shared/constants/common-constants';

/**
 * Create a new project
 * @param payload - The project data
 * @returns The created project
 * @throws ApiError if project creation fails
 */
const createProject = async (payload: IProject): Promise<IProject> => {
    try {
        const project = await Project.create(payload);
        return project;
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

/**
 * Get all projects based on filters
 * @param queryParams - The query parameters from the request
 * @returns An array of projects
 * @throws ApiError if fetching projects fails
 */
const getAllProjects = async (
    queryParams: Record<string, unknown>,
): Promise<IProject[]> => {
    try {
        const filters = paginationPick(
            queryParams,
            projectFilter,
        ) as IProjectFilters;
        const { searchTerm, ...filterData } = filters;
        const andConditions = [];

        if (searchTerm) {
            andConditions.push({
                $or: ['projectName', 'city', 'client.name'].map((field) => ({
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

        const projects = await Project.find(whereConditions);
        return projects;
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiResponseMessage.ERROR.INTERNAL_SERVER_ERROR,
        );
    }
};

/**
 * Get a project by its ID
 * @param id - The project ID
 * @returns The project if found
 * @throws ApiError if project is not found or if fetching fails
 */
const getProjectById = async (id: string): Promise<IProject> => {
    try {
        const project = await Project.findById(id);
        if (!project) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PROJECTS.NOT_FOUND,
            );
        }
        return project;
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

/**
 * Update a project
 * @param id - The project ID
 * @param payload - The update data
 * @returns The updated project
 * @throws ApiError if project is not found or if update fails
 */
const updateProject = async (
    id: string,
    payload: Partial<IProject>,
): Promise<IProject> => {
    try {
        const project = await Project.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PROJECTS.NOT_FOUND,
            );
        }
        return project;
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

/**
 * Delete a project
 * @param id - The project ID
 * @returns The deleted project
 * @throws ApiError if project is not found or if deletion fails
 */
const deleteProject = async (id: string): Promise<IProject> => {
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                apiResponseMessage.PROJECTS.NOT_FOUND,
            );
        }
        return project;
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

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
