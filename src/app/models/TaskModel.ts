/** Colony Task model definitions **/
// reference: https://docs.colony.io/colonyjs/api-colonyclient/#gettaskcall-taskid-

export interface TaskModel {
  cancelled: boolean;
  deliverableDate?: Date;
  deliverableHash?: string; //IPFS hash
  domainId: number;
  dueDate?: Date;
  finalized: boolean;
  id: number;
  payoutsWeCannotMake?: number;
  potId?: number;
  skillId: number;
  specificationHash: string; //IPFS hash
}
