import { useFilePicker } from "use-file-picker";
import { FileContent } from "use-file-picker/types";
import { Button } from "./ui/button";

export default function FilePicker({
  onFiles,
  label,
}: {
  onFiles: (contents: FileContent<string>[], plainFiles: File[]) => void;
  label?: string;
}) {
  const { openFilePicker } = useFilePicker({
    accept: [".txt", ".json", ".dat"],
    readAs: "Text",
    multiple: false,
    onFilesSuccessfullySelected: ({ filesContent, plainFiles }) => {
      onFiles(filesContent, plainFiles);
    },
  });

  return (
    <Button variant={"outline"} onClick={openFilePicker}>
      {label ?? "Load File"}
    </Button>
  );
}
