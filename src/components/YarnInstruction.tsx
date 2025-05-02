import { Instruction } from "../lib/types";
import YarnParam from "./YarnParam";

export default function YarnInstruction({
  instruction,
  index,
  label,
}: {
  instruction: Instruction;
  index: number;
  label?: string;
}) {
  return (
    <>
      <div
        className="p-2 px-4 flex gap-2"
        id={"instruction" + index.toString()}
      >
        <div className="text-foreground/50 text-sm w-8">({index})</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p>
              {instruction.opcode ?? (
                <span className="text-sm">(no opcode)</span>
              )}
            </p>
            <p className="font-semibold">{label && `[Label: ${label}]`}</p>
          </div>
          {instruction.operands && instruction.operands.length > 0 && (
            <div className="flex flex-col gap-2">
              {instruction.operands?.map((param, oIndex) => {
                return (
                  <YarnParam
                    key={oIndex}
                    opIndex={oIndex}
                    instIndex={index}
                    param={param}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
