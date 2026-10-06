import type { Site, Metadata, Socials, GitHubConfig } from "@types";

export const SITE: Site = {
  NAME: "njusunyi",
  // EMAIL: "you@example.com", // uncomment to show an email link on the homepage
  NUM_WORKS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 4,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Personal site of njusunyi: experience and open-source projects.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Open-source projects I have built or contributed to.",
};

export const GITHUB: GitHubConfig = {
  USERNAME: "njusunyi",
  EXCLUDE: ["njusunyi.github.io"],
  PINNED: [],
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/njusunyi",
  },
  // { NAME: "linkedin", HREF: "https://www.linkedin.com/in/<you>" },
];
