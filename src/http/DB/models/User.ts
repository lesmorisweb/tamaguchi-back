/* eslint-disable new-cap */
import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table
export class User extends Model<User, IUserCreateAttributes> {
   @Column({type: DataType.STRING})
   declare name: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
   })
   declare userName: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,

   })
   declare password: string;

   /* @HasMany(()=> Model, {foreignKey: "foreignKey"})
   declare models: Model[]; */
}


interface IUserCreateAttributes {
   name: string,
   userName: string,
   password: string,
}
