import { Instruction, Param } from "../lib/types";
import { getParamType, getParamValue } from "../lib/node";
import YarnParam from "./YarnParam";

export default function YarnInstruction({
  instruction,
  index,
}: {
  instruction: Instruction;
  index: number;
}) {
  return (
    <>
      <div className="p-2 px-4 flex flex-col gap-2">
        <p>
          {instruction.opcode} ({index})
        </p>
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
    </>
  );
}
