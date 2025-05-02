import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Project, YarnNode } from "./types";

export const projectDataAtom = atomWithStorage("projectData", {
  nodes: {},
  initialValues: {},
} as Project);

export const linesDataAtom = atomWithStorage<Record<string, string>>(
  "lines",
  {}
);

export const lineFilterAtom = atom<string>("");
export const lineFilterStateAtom = atom<string>("line");

export const activeYarnNodeAtom = atom<YarnNode>();
