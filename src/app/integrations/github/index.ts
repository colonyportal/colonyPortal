import { GithubIssue as GithubIssue } from "models/github";
 
/* TODO: we can remove this because I dont think we need it? */
export const getIssuesForUser = async (token: string): Promise<GithubIssue[]> => {
  const response = await fetch(
    `https://api.github.com/user/issues?access_token=${token}&filter=all`
  );
  return response.json();
};

export const getIssuesForRepo = async (owner: string, repo: string): Promise<GithubIssue[]> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`
  );
  return response.json();
};
