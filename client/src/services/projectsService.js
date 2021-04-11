
import { ERROR } from "../errorHandling";
import client from "../feathersClient";

const projects = client.service('projects');

// call api to create project
export const createProject = async (userId, project) => {
    return await projects.create({ ...project, "_id": undefined, "userId": userId, "dateModified": new Date() }, {});
}

// call api to projects by userId
export const getProjectsByUserId = async (userId) => {
    return projects.find({
        query: {
            userId: userId
        }
    }).then(u => u.data.length ? u.data : undefined)
}

// call api to update project
export const updateProject = async (project) => {
    project.dateModified = new Date();
    return await projects.update(project._id, project, {});
}

// call api to patch project
export const patchProject = async (projectPartial) => {
    projectPartial.dateModified = new Date();
    return await projects.patch(projectPartial._id, projectPartial, {});
}

// call api to patch project
export const deleteProject = async (projectId) => {
    return await projects.remove(projectId);
}
