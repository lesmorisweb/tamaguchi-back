/* eslint-disable new-cap */
import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export class Pet extends Model<Pet, IPetCreateAttributes> {
   @Column({
      type: DataType.STRING,
      allowNull: false,

   })
   declare petName: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
   })
   declare userName: string;

   @Column({
      type: DataType.STRING,
   })
   declare petColor: string;

   @Column({
      type: DataType.NUMBER,
      allowNull: true,
   })
   declare fun: number;

   @Column({
      type: DataType.NUMBER,
      allowNull: true,
   })
   declare heart: number;

   @Column({
      type: DataType.NUMBER,
      allowNull: true,
   })
   declare hungry: number;

   @Column({
      type: DataType.NUMBER,
      allowNull: true,
   })
   declare age: number;

   /* @HasMany(()=> Model, {foreignKey: "foreignKey"})
   declare models: Model[]; */
}


interface IPetCreateAttributes {
   petName: string,
   userName: string,
   petColor: string,
   fun:number,
   heart:number,
   hungry:number,
   age:number,

}
