import { useAtomValue } from "jotai";
import YarnInstruction from "./YarnInstruction";
import { activeYarnNodeAtom } from "@/lib/atom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import YarnInstructionEditor from "./YarnInstructionEditor";

export default function YarnProjectNodeViewer() {
  const activeNode = useAtomValue(activeYarnNodeAtom);

  return (
    <Tabs defaultValue="viewer" className="h-full">
      <div className="border-b border-b-border p-4 flex items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="viewer">Viewer</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        <div className="pr-4">
          <h2 className="font-semibold">{activeNode?.name}</h2>
        </div>
      </div>

      <TabsContent value="viewer">
        <div className="divide-y divide-border shrink">
          {activeNode?.instructions &&
            activeNode.instructions.map((instruction, index) => {
              return (
                <YarnInstruction
                  key={index}
                  instruction={instruction}
                  index={index}
                />
              );
            })}
        </div>
        <div className="border-t border-t-border p-2 mt-4 pb-24 px-4 flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Labels</h2>
          <div className="w-[400px] divide-y divide-border">
            {activeNode?.labels &&
              Object.keys(activeNode.labels).map((labelKey, index) => {
                let label = activeNode.labels[labelKey];
                return (
                  <div
                    key={index}
                    className="p-2 px-4 flex justify-between gap-2"
                  >
                    <p className="font-medium">{labelKey}</p>
                    <p>{label}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="editor">
        <div className="p-2 px-4 flex flex-col gap-2 grow">
          <YarnInstructionEditor></YarnInstructionEditor>
        </div>
      </TabsContent>
    </Tabs>
  );
}
