import {Game} from "../GameCore/Game";
import {GamesNames} from "../GameCore/games.types";
import {
   IEmitBadMovement,
   IEmitTictacMove, IIncomingTicTacToeMove,
   ITicTacFieldData, tFieldData,
} from "./ticTacToe.types";
import {TicTacEvents} from "./TicTacEvents";


export class TicTacToe extends Game {
   private _fields: ITicTacFieldData[] = initialFieldsState;

   constructor(
      sessionTime: number,
      maxAllowedPlayers: number,
      minRequiredPlayers: number) {
      super(
         GamesNames.TIC_TAC,
         sessionTime,
         maxAllowedPlayers,
         minRequiredPlayers,
      );
   }

   private incomingMove({playerId, fieldId}: IIncomingTicTacToeMove) {
      const fieldIndex = this._fields.findIndex(
         (field) => field.index === fieldId);
      if (this._fields[fieldIndex].isLocked) {
         this.emitBadMovement(fieldId);
         return;
      }
      this.applyMovement(fieldIndex);
   }

   private applyMovement(fieldIndexId: number) {
      this._fields[fieldIndexId].isLocked = true;
      this._fields[fieldIndexId].fieldData = gameMarks[this.currentTurnIndex];
      this.changeTurn();
      this.emitMovement();
   }

   private emitBadMovement(fieldId: number) {
      this._session.emitEvent<IEmitBadMovement>(TicTacEvents.BadMove, {
         message: `Field ${ fieldId } is locked`,
      });
   }

   private emitMovement() {
      this._session.emitEvent<IEmitTictacMove>(TicTacEvents.OutgoingMovement, {
         nextTurn: this.currentPlayer,
         fields: this._fields,
         turnIndex: this.currentTurnIndex,
      });
   }

   injectEvents(): void {
      this._session.addIoEvent(TicTacEvents.IncomingMovement, (socket) => {
         console.log(socket);
      });
   }
}

const initialFieldsState: ITicTacFieldData[] = [
   {
      fieldData: "",
      isLocked: false,
      index: 0,
   }, {
      fieldData: "",
      isLocked: false,
      index: 1,
   }, {
      fieldData: "",
      isLocked: false,
      index: 2,
   }, {
      fieldData: "",
      isLocked: false,
      index: 3,
   }, {
      fieldData: "",
      isLocked: false,
      index: 4,
   }, {
      fieldData: "",
      isLocked: false,
      index: 5,
   }, {
      fieldData: "",
      isLocked: false,
      index: 6,
   }, {
      fieldData: "",
      isLocked: false,
      index: 7,
   }, {
      fieldData: "",
      isLocked: false,
      index: 8,
   },
];

const gameMarks: tFieldData[] = ["X", "O", "I"];
