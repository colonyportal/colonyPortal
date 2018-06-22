/** Colony Task model definitions **/
// reference: https://docs.colony.io/colonyjs/api-colonyclient/#gettaskcall-taskid-

export type Task = {
  /** Boolean flag denoting whether the task is cancelled.*/
  cancelled: boolean;

  /** Date when the deliverable is due.*/
  deliverableDate?: string;

  /** IPFS hash unique hash of the deliverable content.*/
  deliverableHash?: string;

  /**	Integer Domain ID the task belongs to. */
  domainId: number;

  /** Date when the task is due. */
  dueDate?: string;

  /** Boolean flag denoting whether the task is finalized. */
  finalized: boolean;

  /** Integer task ID. */
  id: number;

  /** Number of payouts that cannot be completed with the current task funding. */
  payoutsWeCannotMake?: number;

  /** Integer ID of funding pot for the task. */
  potId?: number;

  /** Integer Skill ID the task is assigned to. */
  skillId: number;

  /** IPFS hash	Unique hash of the specification content. */
  specificationHash: string;
};

export type Domain = {
  /** ID of the domain. */
  domainId: number;

  /** The domain's local skill ID. */
  localSkillId: number;

  /** The domain's funding pot ID. */
  potId: number;
};

/*  */
export type TaskTemplate = {
  colonyAddress: string;
  domainId: number;
  issueData: {
    title: string;
    body: string;
    url: string;
  };
};
