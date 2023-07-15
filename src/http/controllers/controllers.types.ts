

export interface IReq<T> {
   body: T
}

export type tDBOperationOutput<T> =
   ISuccessOperationFromDataBase<T> | IFailedOperationFromDatabase;

export interface ISuccessOperationFromDataBase<T> {
   success: true,
   item?: T | T[],
   message?: string
   resStatus: number,
   dbData: any
}

export interface IFailedOperationFromDatabase {
   success: false,
   resStatus?: number,
   message: string,
   dbData?: any
}
