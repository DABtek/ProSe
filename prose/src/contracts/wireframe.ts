export type RoleOption = {
  label: string;
  desc: string;
  icon: string;
};

export type TimelineState = "done" | "alert" | "upcoming" | "default";

export type TimelineEvent = {
  date: string;
  title: string;
  desc: string;
  state?: TimelineState;
  actions?: string[];
};

export type DocumentStatusItem = {
  title: string;
  meta: string;
  status: string;
};

export type WireframeChecklistItem = {
  label: string;
  status: "done" | "pending" | "todo";
};
