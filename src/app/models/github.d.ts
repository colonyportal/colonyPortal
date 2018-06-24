/** Github Issue model definitions **/

export type GithubIssue = {
  title: string;
  body: string;
  url: string;
  html_url: string;
  number?: number,
  created_at: string,
  user: {
    login: string
    url: string
  }
};
