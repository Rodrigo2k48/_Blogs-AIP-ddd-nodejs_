/* eslint-disable no-unused-vars */
export interface HashRepository {
  valueInHash(password: string): string
  compare(passInDB: string, password: string): boolean;
  
}