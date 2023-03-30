import { ObjectModel, ArrayModel } from 'objectmodel';
import sanitizer from 'sanitizer';
import { ObjectId } from 'mongodb';

export async function insertProject({ db, projectTitle }) {
  /* PROJECTS */

  /* The Model */

  const ProjectModel = new ObjectModel({
    /*     requestor: Object,
    status: String,
    projectNumber: String,
    projectDescription: String, */
    //groupId: String,
    projectTitle: String,
    requests: Array,
    createdAt: Date,
  });

  /* The adding of data to the Models */
  const requestItems = [];
  const _project = new ProjectModel({
    // requestor: request_metadata.requestor,
    /*     status: sanitizer.escape(request_metadata.status),
    projectNumber: sanitizer.escape(request_metadata.projectNumber),
    requests: request_metadata.requests,
    projectDescription: sanitizer.escape(request_metadata.projectDescription), */
    // groupId: sanitizer.escape(groupId),
    requests: requestItems,
    projectTitle: sanitizer.escape(projectTitle),
    createdAt: new Date(),
  });

  /* The putting of the datas into the mongo */
  const _project_response = await db.collection('projects').insertOne(_project);
}

export async function editProjectTitle({ db, projectId, projectTitle }) {
  const _project = await db
    .collection('projects')
    .findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $set: { projectTitle: projectTitle } },
      { returnOriginal: false }
    );

  return _project;
}

export async function deleteProject({ db, projectId }) {
  const _project = await db
    .collection('projects')
    .findOneAndDelete(
      { _id: new ObjectId(projectId) },
      { returnOriginal: false }
    );

  return _project;
}

export async function updateProjectWithRequest({ db, projectId, groupId }) {
  const _project = await db.collection('projects').findOneAndUpdate(
    { _id: new ObjectId(projectId) },
    {
      $addToSet: {
        requests: { groupId: new ObjectId(groupId) },
      },
    },
    { returnOriginal: false }
  );

  return _project;
}

export async function deleteRequestFromProject({ db, projectId, groupId }) {
  console.log('deleteRequestFromProject', projectId, groupId);

  const _project = await db.collection('projects').updateOne(
    { _id: new ObjectId(projectId) },
    {
      $pull: {
        requests: { groupId: new ObjectId(groupId) },
      },
    },
    { returnOriginal: false }
  );

  return _project;
}
