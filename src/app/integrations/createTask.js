const ecp = require('./ecp');
import { getColonyClient } from './colony';

export const createColonyTask = async (taskAttributes) => {
  // Initialise the Extended Colony Protocol
  await ecp.init();
  console.log('after ecp init');
  const colonyClient = await getClonyClient();
  console.log('after get colony client');
  // Create a task!
  // taskAttributes are from TaskForm - title, body and url for now
  const specificationHash = await ecp.saveTaskSpecification(taskAttributes);

  // Unique, immutable hash on IPFS
  console.log('Specification hash', specificationHash);

  // Create a task in the root domain
  // TODO: we need to figure out domainId
  const { eventData: { taskId } } = await colonyClient.createTask.send({ specificationHash, domainId: 1 });

  // Let's take a look at the newly created task
  const task = await colonyClient.getTask.call({ taskId })
  console.log(task);

  // Do some cleanup
  await ecp.stop();
}
