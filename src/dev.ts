import "dotenv/config";

import { Octokit } from "octokit";
import { LinearClient } from "@linear/sdk";

import { action } from "./action";

void (async function () {
  const linearApiKey = process.env.LINEAR_API_KEY!;
  const githubApiKey = process.env.GITHUB_API_KEY!;

  const linear = new LinearClient({ apiKey: linearApiKey });
  const octokit = new Octokit({ auth: githubApiKey });

  await action({ octokit, linear });
})().catch(e => {
  console.log(e);
  process.exit(1);
});
