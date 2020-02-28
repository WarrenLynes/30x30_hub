export interface Repo {
  id: string;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin:boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count:number;
  watchers_count:number;
  language: string;
  has_issues:boolean;
  has_projects:boolean;
  has_downloads:boolean;
  has_wiki:boolean;
  has_pages:boolean;
  forks_count:number;
  mirror_url: string;
  archived:boolean;
  disabled:boolean;
  open_issues_count:number;
  license: string;
  forks:number;
  open_issues:number;
  watchers:number;
  default_branch: string;
  permissions:{
    admin: boolean;
    push: boolean;
    pull: boolean;
  }
};

export const emptyRepo = {
  id:null,
  node_id:null,
  name:null,
  full_name:null,
  private:false,
  owner:{
    login:null,
    id:0,
    node_id:null,
    avatar_url:null,
    gravatar_id:null,
    url:null,
    html_url:null,
    followers_url:null,
    following_url:null,
    gists_url:null,
    starred_url:null,
    subscriptions_url:null,
    organizations_url:null,
    repos_url:null,
    events_url:null,
    received_events_url:null,
    type:null,
    site_admin:false},
  html_url:null,
  description:null,
  fork:false,
  url:null,
  forks_url:null,
  keys_url:null,
  collaborators_url:null,
  teams_url:null,
  hooks_url:null,
  issue_events_url:null,
  events_url:null,
  assignees_url:null,
  branches_url:null,
  tags_url:null,
  blobs_url:null,
  git_tags_url:null,
  git_refs_url:null,
  trees_url:null,
  statuses_url:null,
  languages_url:null,
  stargazers_url:null,
  contributors_url:null,
  subscribers_url:null,
  subscription_url:null,
  commits_url:null,
  git_commits_url:null,
  comments_url:null,
  issue_comment_url:null,
  contents_url:null,
  compare_url:null,
  merges_url:null,
  archive_url:null,
  downloads_url:null,
  issues_url:null,
  pulls_url:null,
  milestones_url:null,
  notifications_url:null,
  labels_url:null,
  releases_url:null,
  deployments_url:null,
  created_at:null,
  updated_at:null,
  pushed_at:null,
  git_url:null,
  ssh_url:null,
  clone_url:null,
  svn_url:null,
  homepage:null,
  size:0,
  stargazers_count:0,
  watchers_count:0,
  language:null,
  has_issues:true,
  has_projects:true,
  has_downloads:true,
  has_wiki:true,
  has_pages:false,
  forks_count:0,
  mirror_url:null,
  archived:false,
  disabled:false,
  open_issues_count:0,
  license:null,
  forks:0,
  open_issues:0,
  watchers:0,
  default_branch:null,
  permissions:{admin:true,
    push:true,
    pull:true}}
