import { ReactNode } from "react";

export type NavigationLink = {
  kind?: "link";
  to: string;
  title: string | ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export type NavigationTitle = {
  kind: "header";
  title: string;
};

export type NavigationDivider = {
  kind: "divider";
};

export type NavigationItems =
  | NavigationLink
  | NavigationTitle
  | NavigationDivider;
