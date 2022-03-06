import { GitHub } from "@actions/github/lib/utils";
import { LinearClient } from "@linear/sdk";

import { fetchAllWorkflows } from "./linear/workflows";

type ActionOptions = {
  linear: LinearClient;
  octokit: InstanceType<typeof GitHub>;
}

export async function action({ linear }: ActionOptions) {
  const workflows = await fetchAllWorkflows(linear);

  console.log({ workflows });
}
