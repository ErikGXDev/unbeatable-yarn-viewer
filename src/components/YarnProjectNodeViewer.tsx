import { useAtomValue } from "jotai";
import YarnInstruction from "./YarnInstruction";
import { activeYarnNodeAtom } from "@/lib/atom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import YarnInstructionEditor from "./YarnInstructionEditor";

export default function YarnProjectNodeViewer() {
  const activeNode = useAtomValue(activeYarnNodeAtom);

  function findLabel(index: number) {
    if (activeNode?.labels) {
      const label = Object.keys(activeNode.labels).find(
        (key) => activeNode.labels[key] === index
      );
      return label;
    }
    return "";
  }

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
        <div className="flex flex-col p-4">
          <h2 className="font-semibold text-lg">
            Instructions ("Dialogue Flow")
          </h2>
          <p className="text-foreground/80 w-[600px] text-pretty text-sm">
            These are the instructions which are executed when the dialogue is
            playing in-game. Change instruction arguments here or add new
            instructions in the Editor Tab. Quickly find and edit lines by using
            blue link buttons that appear next to a line reference.
          </p>
        </div>

        <div className="divide-y divide-border shrink flex flex-col gap-2">
          {activeNode?.instructions &&
            activeNode.instructions.map((instruction, index) => {
              return (
                <div className="border border-border rounded-md mx-4">
                  <YarnInstruction
                    key={index}
                    instruction={instruction}
                    index={index}
                    label={findLabel(index)}
                  />
                </div>
              );
            })}
        </div>
        <div className="border-t border-t-border p-2 mt-4 pb-24 px-4 flex flex-col gap-2">
          <div className="flex flex-col py-2">
            <h2 className="font-semibold text-lg">Labels</h2>
            <p className="text-foreground/80 w-[600px] text-pretty text-sm">
              These are "shortcuts" to instructions which are for example used
              together with dialog options. They point to an index, which is the
              nth instruction in the list above (counting from 0).
              <br></br>Edit these in the Editor Tab.
            </p>
          </div>
          <div className="min-w-[300px] w-fit divide-y divide-border border border-border rounded-md">
            {activeNode?.labels &&
              Object.keys(activeNode.labels).map((labelKey, index) => {
                let label = activeNode.labels[labelKey];
                return (
                  <div
                    key={index}
                    className="p-2 px-4 flex justify-between gap-12"
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
