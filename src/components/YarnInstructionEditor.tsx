import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";
import { activeYarnNodeAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function YarnInstructionEditor() {
  const [activeNode, setActiveNode] = useAtom(activeYarnNodeAtom);

  const [value, setValue] = useState<string>(
    JSON.stringify(activeNode, null, 2)
  );

  useEffect(() => {
    if (activeNode) {
      //save(value);
    }
  }, [value]);

  async function save(value: string) {
    if (activeNode) {
      try {
        setActiveNode(JSON.parse(value));
      } catch (e) {}
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center py-2 sticky top-0 w-full bg-background border-b border-b-border z-10">
        <h2>Editor</h2>
        <Button
          className="sticky top-8 right-8 z-100"
          onClick={() => save(value)}
        >
          Save
        </Button>
      </div>

      <CodeMirror
        height="100%"
        theme={githubDark}
        extensions={[json()]}
        value={value}
        onChange={setValue}
      />
      <div className="p-4">
        <p className="text-sm text-foreground/80">
          Edit the instructions in JSON format. The changes will be reflected in
          the viewer.
        </p>
        <p className="text-sm text-foreground/80">
          Current node has {activeNode?.instructions?.length ?? 0} instructions
          and {Object.keys(activeNode?.labels ?? {}).length} labels.
        </p>
      </div>
    </div>
  );
}
