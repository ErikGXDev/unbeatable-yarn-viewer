export interface Project {
  nodes: Record<string, YarnNode>;
  initialValues: Record<string, Param>;
}

export interface YarnNode {
  name: string;
  instructions: Instruction[];
  labels: Record<string, string>;
  tags: string[];
}

export interface Instruction {
  opcode: string;
  operands?: Param[];
}

export type Param = StringParam | FloatParam | BoolParam | Record<string, any>;

export type ParamKeyType = "stringValue" | "floatValue" | "boolValue";

export type ParamValueType = string | number | boolean;

export type StringParam = Record<"stringValue", string>;
export type FloatParam = Record<"floatValue", number>;
export type BoolParam = Record<"boolValue", boolean>;
