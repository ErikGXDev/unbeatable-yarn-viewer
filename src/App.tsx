import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { activeYarnNodeAtom, linesDataAtom, projectDataAtom } from "./lib/atom";
import FilePicker from "./components/FilePicker";
import YarnProjectNodeViewer from "./components/YarnProjectNodeViewer";
import NodeSelector from "./components/NodeSelector";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import YarnLineViewer from "./components/YarnLineViewer";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import FileSaver from "./components/FileSaver";
import { useState } from "react";
import { Button } from "./components/ui/button";
import GithubIcon from "./components/GithubIcon";

function App() {
  const [projectData, setProjectData] = useAtom(projectDataAtom);
  const [linesData, setLinesData] = useAtom(linesDataAtom);
  const activeYarnNode = useAtomValue(activeYarnNodeAtom);

  const [filename, setFilename] = useState<string>("");

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <main className="h-screen flex flex-col">
          <div className="flex justify-between items-center gap-2 p-4 border-b border-b-border">
            <div className="flex gap-2">
              <FilePicker
                label="Load Project"
                onFiles={(contents, files) => {
                  const filename = contents[0].name;
                  setFilename(filename);
                  const fileJSON = JSON.parse(contents[0].content);
                  console.log(fileJSON);
                  setProjectData(fileJSON);
                }}
              />

              <FilePicker
                label="Load Lines"
                onFiles={(contents) => {
                  const fileJSON = JSON.parse(contents[0].content);
                  console.log(fileJSON);
                  setLinesData(fileJSON);
                }}
              />

              <NodeSelector options={Object.keys(projectData.nodes)} />

              <FileSaver
                fileName={filename}
                fileContents={JSON.stringify(projectData, null, 2)}
                label="Save Project"
              />

              <FileSaver
                fileName="lines.json"
                fileContents={JSON.stringify(linesData, null, 2)}
                label="Save Lines"
              />
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <a href="https://github.com/ErikGXDev/unbeatable-yarn-viewer">
                <Button variant={"ghost"} className="p-0 flex">
                  <span>(UNBEATABLE) Yarn Viewer by ErikGXDev</span>
                  <GithubIcon />
                </Button>
              </a>
            </div>
          </div>
          <div className="w-full flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel className="flex flex-col">
                {activeYarnNode && (
                  <ScrollArea className="h-full">
                    <YarnProjectNodeViewer />
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                )}
                {!activeYarnNode && (
                  <>
                    {Object.keys(projectData.nodes).length == 0 ? (
                      <div className="w-full mt-8 flex justify-center">
                        <p>No project loaded.</p>
                      </div>
                    ) : (
                      <div className="w-full mt-8 flex justify-center">
                        <p>Select a node to view its details.</p>
                      </div>
                    )}
                  </>
                )}
              </ResizablePanel>
              <ResizableHandle withHandle></ResizableHandle>
              <ResizablePanel className="flex flex-col">
                {Object.keys(linesData).length > 0 ? (
                  <ScrollArea className="h-full">
                    <YarnLineViewer linesData={linesData}></YarnLineViewer>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                ) : (
                  <div className="w-full mt-8 flex justify-center">
                    <p>No lines loaded.</p>
                  </div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
