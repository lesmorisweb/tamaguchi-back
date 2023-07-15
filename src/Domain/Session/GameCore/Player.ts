export class Player {
   private _id: string;
   private _name: string;
   private _score: number;

   constructor(id: string, name: string) {
      this._id = id;
      this._name = name;
      this._score = 0;
   }
}
