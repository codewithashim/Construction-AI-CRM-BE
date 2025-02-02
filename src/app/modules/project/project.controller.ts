import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/utils/catch-async';
import sendResponse from '../../../shared/utils/send-response';
import { ProjectService } from './project.service';
import { IProject } from './project.interface';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';

/**
 * Create a new project
 * @param req - Express request object
 * @param res - Express response object
 */
const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.createProject(req.body);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: apiResponseMessage.PROJECTS.CREATE_SUCCESS,
    data: project,
  });
});

/**
 * Get all projects
 * @param req - Express request object
 * @param res - Express response object
 */
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectService.getAllProjects(req.query);
  sendResponse<IProject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: apiResponseMessage.PROJECTS.FETCH_SUCCESS,
    data: projects,
  });
});

/**
 * Get a project by ID
 * @param req - Express request object
 * @param res - Express response object
 */
const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.getProjectById(req.params.id);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: apiResponseMessage.PROJECTS.FETCH_SINGLE_SUCCESS,
    data: project,
  });
});

/**
 * Update a project
 * @param req - Express request object
 * @param res - Express response object
 */
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.updateProject(req.params.id, req.body);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: apiResponseMessage.PROJECTS.UPDATE_SUCCESS,
    data: project,
  });
});

/**
 * Delete a project
 * @param req - Express request object
 * @param res - Express response object
 */
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectService.deleteProject(req.params.id);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: apiResponseMessage.PROJECTS.DELETE_SUCCESS,
    data: project,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};