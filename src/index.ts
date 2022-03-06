import { error, getInput, setFailed } from "@actions/core";
import { getOctokit } from "@actions/github";
import { LinearClient } from "@linear/sdk";
import { action } from "./action";

void (async function () {
  const linearApiKey = getInput("linear-api-key", { required: true });
  const githubApiKey = getInput("github-api-key", { required: true });

  const linear = new LinearClient({ apiKey: linearApiKey });
  const octokit = getOctokit(githubApiKey);

  await action({ octokit, linear });
})().catch(e => {
  error(e);
  setFailed(e.message);
});
