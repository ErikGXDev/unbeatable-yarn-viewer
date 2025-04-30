import { Button } from "./ui/button";
import { downloadFile } from "@/lib/utils";

export default function FileSaver({
  fileName,
  fileContents,
  label,
}: {
  fileName: string;
  fileContents: string;
  label?: string;
}) {
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        downloadFile(fileName, fileContents);
      }}
    >
      {label ?? "Load File"}
    </Button>
  );
}
