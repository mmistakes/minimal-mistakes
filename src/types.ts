export type Site = {
  NAME: string;
  EMAIL?: string;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export type GitHubConfig = {
  USERNAME: string;
  // Repo names to hide from the projects list.
  EXCLUDE: string[];
  // Repo names to always show first, in this order.
  PINNED: string[];
};
