import {Player} from "../GameCore/Player";
import {Socket} from "socket.io";

export interface IIncomingTicTacToeMove {
   playerId: string,
   fieldId: number,
}

export type tIoEvent = (socket: Socket) => void

export interface IEmitTictacMove {
   fields: ITicTacFieldData[],
   nextTurn: Player,
   turnIndex: number,
}

export interface IEmitBadMovement {
   message: string;
}

export interface ITicTacFieldData {
   fieldData: tFieldData,
   index: number,
   isLocked: boolean,
}

export type tFieldData = "X" | "O" | "" | "I";
