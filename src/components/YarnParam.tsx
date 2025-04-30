import { useEffect, useState } from "react";
import { getParamType, getParamValue } from "../lib/node";
import { Param, ParamKeyType, ParamValueType } from "../lib/types";
import { Input } from "./ui/input";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activeYarnNodeAtom,
  lineFilterAtom,
  lineFilterStateAtom,
  linesDataAtom,
  projectDataAtom,
} from "@/lib/atom";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function YarnParam({
  param,
  opIndex,
  instIndex,
}: {
  param: Param;
  opIndex: number;
  instIndex: number;
}) {
  const [paramValueState, setParamValueState] = useState<ParamValueType>();
  const [paramTypeState, setParamTypeState] = useState<string>();

  const lineData = useAtomValue(linesDataAtom);

  const [hasLineReference, setHasLineReference] = useState(false);

  const setLineFilter = useSetAtom(lineFilterAtom);
  const setLineFilterState = useSetAtom(lineFilterStateAtom);

  const [projectData, setProjectData] = useAtom(projectDataAtom);
  const [activeNode, setActiveNode] = useAtom(activeYarnNodeAtom);

  function checkLineReference() {
    if (paramTypeState == "stringValue") {
      // check if value has a line:XXXXXXX format
      let value = paramValueState as string;
      if (value.startsWith("line:") && lineData[value]) {
        setHasLineReference(true);
      } else {
        setHasLineReference(false);
      }
    }
  }

  useEffect(() => {
    const paramType = getParamType(param);
    const paramValue = getParamValue(param);

    setParamTypeState(paramType);
    setParamValueState(paramValue);
  }, [param]);

  useEffect(() => {
    checkLineReference();
  }, [lineData]);

  useEffect(() => {
    checkLineReference();

    if (activeNode) {
      if (activeNode.instructions[instIndex].operands && paramTypeState) {
        //@ts-ignore
        activeNode.instructions[instIndex].operands[opIndex][paramTypeState] =
          paramValueState;

        setActiveNode({
          ...activeNode,
          instructions: activeNode.instructions,
        });

        setProjectData({
          ...projectData,
          nodes: {
            ...projectData.nodes,
            [activeNode.name]: activeNode,
          },
        });
      }
    }
  }, [paramValueState]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-foreground/80 w-20">
        {paramTypeState}
      </label>

      {paramTypeState === "stringValue" && (
        <>
          <Input
            type="text"
            className="h-8 w-fit"
            value={paramValueState as string}
            onChange={(e) => setParamValueState(e.target.value)}
          ></Input>
          {hasLineReference && (
            <div className="relative flex">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    className="size-8"
                    onClick={() => {
                      setLineFilterState("line");
                      setLineFilter(paramValueState as string);
                    }}
                  >
                    <ExternalLink />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset={8}>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{paramValueState as string}</p>
                    <p className="text-sm text-foreground/80">
                      {lineData[paramValueState as string]}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div className="absolute left-18 top-1/2 -translate-y-1/2 w-[400px] text-sm text-foreground/60 bg-card/40 p-2 rounded-md border border-border">
                <p>{lineData[paramValueState as string]}</p>
              </div>
            </div>
          )}
        </>
      )}
      {paramTypeState === "floatValue" && (
        <Input
          type="number"
          className="h-8 w-fit"
          value={paramValueState as number}
          onChange={(e) => setParamValueState(parseFloat(e.target.value))}
        ></Input>
      )}
      {paramTypeState === "boolValue" && (
        <input
          type="checkbox"
          checked={paramValueState as boolean}
          onChange={(e) => setParamValueState(e.target.checked)}
        ></input>
      )}
    </div>
  );
}
