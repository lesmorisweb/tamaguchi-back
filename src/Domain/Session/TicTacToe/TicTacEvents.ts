export const TicTacEvents = {
   OutgoingMovement: "applyMovements",
   IncomingMovement: "incomingMovement",
   BadMove: "Move",
};

export type tEventPayload<T> = ((payload?: T) => void)
