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

export type NavigationBrand = {
  kind: "brand";
  to: string;
  title: string | ReactNode;
};

export type NavigationItems =
  | NavigationLink
  | NavigationTitle
  | NavigationDivider
  | NavigationBrand;
