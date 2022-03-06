import type { WorkflowState } from "@linear/sdk";
import { LinearClient } from "@linear/sdk";

type WorkflowStateByName = Record<string, WorkflowState>;

export async function fetchAllWorkflows(client: LinearClient): Promise<WorkflowStateByName> {
  let res = await client.workflowStates();

  const workflows: WorkflowState[] = [];

  do {
    workflows.push(...res.nodes);
    res = await res.fetchNext();
  } while (res.pageInfo.hasNextPage);

  return workflows.reduce<WorkflowStateByName>((prev, next) => {
    return { ...prev, [next.name]: next };
  }, {});
}