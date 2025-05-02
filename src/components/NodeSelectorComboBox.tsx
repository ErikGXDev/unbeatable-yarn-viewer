"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom, useAtomValue } from "jotai";
import { activeYarnNodeAtom, projectDataAtom } from "@/lib/atom";

export function NodeSelectorComboBox({ options }: { options: string[] }) {
  const [open, setOpen] = React.useState(false);

  const [activeNode, setActiveNode] = useAtom(activeYarnNodeAtom);
  const projectData = useAtomValue(projectDataAtom);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <span className="text-ellipsis overflow-hidden">
            {activeNode?.name
              ? options.find((opt) => opt === activeNode.name)
              : "Select a node..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search for a node..." />
          <CommandList>
            <CommandEmpty>
              <p className="px-4">No nodes found. Please load a project.</p>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setActiveNode(projectData.nodes[currentValue]);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      activeNode?.name === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
