// D-Cell Reference.

import { linesDataAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function YarnLineCell({ lineKey }: { lineKey: string }) {
  const [linesData, setLinesData] = useAtom(linesDataAtom);

  const [enableEdit, setEnableEdit] = useState(false);
  const [editValue, setEditValue] = useState<string>(linesData[lineKey]);

  useEffect(() => {
    setEditValue(linesData[lineKey]);
  }, [linesData, lineKey]);

  return (
    <div className="p-2 px-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p className="font-semibold">{lineKey}</p>
        <Button
          variant={"ghost"}
          className="p-0 size-8"
          onClick={() =>
            setEnableEdit((prev) => {
              if (prev) {
                setLinesData((prevLines) => ({
                  ...prevLines,
                  [lineKey]: editValue,
                }));
              }
              return !prev;
            })
          }
        >
          <Edit></Edit>
        </Button>
      </div>
      {enableEdit ? (
        <textarea
          wrap={"soft"}
          className="text-sm text-foreground/80 border border-muted rounded-md p-1"
          autoFocus
          onChange={(e) => {
            setEditValue(e.target.value);
          }}
          value={editValue}
        />
      ) : (
        <p className="text-sm text-foreground/80 mb-1">{linesData[lineKey]}</p>
      )}
    </div>
  );
}
