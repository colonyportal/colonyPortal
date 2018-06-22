import { Issue as GithubIssue } from "models/github";

export const getIssues = async (token: string): Promise<GithubIssue[]> => {
  const response = await fetch(
    `https://api.github.com/user/issues?access_token=${token}&filter=all`
  );
  return response.json();
};
