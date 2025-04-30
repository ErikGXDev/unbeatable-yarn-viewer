import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useAtom } from "jotai";
import { lineFilterAtom, lineFilterStateAtom } from "@/lib/atom";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import YarnLineCell from "./YarnLineCell";

export default function YarnLineViewer({
  linesData,
}: {
  linesData: Record<string, string>;
}) {
  const [lineFilter, setLineFilter] = useAtom(lineFilterAtom);
  const [lineFilterState, setLineFilterState] = useAtom(lineFilterStateAtom);

  const [lineKeys, setLineKeys] = useState<string[]>([]);

  const [lineAmount, setLineAmount] = useState(40);

  useEffect(() => {
    if (lineFilter) {
      const filteredKeys = Object.keys(linesData).filter((key) =>
        (lineFilterState == "line" ? key : linesData[key])
          .toLowerCase()
          .includes(lineFilter.toLowerCase())
      );
      setLineKeys(filteredKeys);
    } else if (lineAmount > 0) {
      const filteredKeys = Object.keys(linesData).slice(0, lineAmount);
      setLineKeys(filteredKeys);
    } else {
      setLineKeys(Object.keys(linesData));
    }
  }, [linesData, lineAmount, lineFilter, lineFilterState]);

  return (
    <div className="relative">
      <div className="p-4 border-b border-b-border sticky top-0 w-full bg-background flex gap-4">
        <Input
          placeholder="Search for line..."
          value={lineFilter}
          onChange={(val) => {
            setLineFilter(val.target.value);
          }}
        ></Input>
        <Select value={lineFilterState} onValueChange={setLineFilterState}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a node" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="line">Line ID</SelectItem>
            <SelectItem value="content">Line Content</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="divide-y divide-border pb-64">
        {lineKeys.map((key) => {
          return <YarnLineCell lineKey={key} />;
        })}

        {Object.keys(linesData).length !== lineKeys.length && !lineFilter && (
          <div className="flex flex-col items-center p-2 py-8 gap-2">
            <p className="text-sm text-foreground/80">
              Showing {lineKeys.length} of {Object.keys(linesData).length}{" "}
              lines.
            </p>
            <Button
              variant={"secondary"}
              className="w-34"
              onClick={() => {
                setLineAmount((prev) => prev + 40);
              }}
            >
              Show more lines
            </Button>
            <Button
              variant={"outline"}
              className="w-34"
              onClick={() => {
                setLineAmount(-1);
              }}
            >
              Show all (laggy)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
