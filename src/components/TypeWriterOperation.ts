export enum OpType {
  TYPE = 'typing',
  WAIT = 'wait',
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
}

export type Operation =
  | { type: OpType.TYPE; text: string }
  | { type: OpType.WAIT; time: number }
  | { type: OpType.DELETE; length: number }
  | { type: OpType.DELETE_ALL };

export const opType = (text: string): Operation => ({
  type: OpType.TYPE,
  text,
});
export const opWait = (time: number): Operation => ({
  type: OpType.WAIT,
  time,
});
export const opDelete = (length: number): Operation => ({
  type: OpType.DELETE,
  length,
});
export const opDeleteAll = (): Operation => ({ type: OpType.DELETE_ALL });
