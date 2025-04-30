import { useAtomValue, useSetAtom } from "jotai";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { activeYarnNodeAtom, projectDataAtom } from "@/lib/atom";

export default function NodeSelector({ options }: { options: string[] }) {
  const setActiveNode = useSetAtom(activeYarnNodeAtom);

  const projectData = useAtomValue(projectDataAtom);

  return (
    <>
      <Select
        onValueChange={(value) => {
          setActiveNode(projectData.nodes[value]);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a node" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
