import { atom } from "jotai";
import { Project, YarnNode } from "./types";
import { focusAtom } from "jotai-optics";

export const projectDataAtom = atom({
  nodes: {},
  initialValues: {},
} as Project);

export const linesDataAtom = atom<Record<string, string>>({});

export const lineFilterAtom = atom<string>("");
export const lineFilterStateAtom = atom<string>("line");

export const activeYarnNodeAtom = atom<YarnNode>();
