import { Schema, connect, Model } from 'mongoose';
export type usersT = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
};
export interface UserModel extends Model<usersT> {
  isUserExists(userId: number | string): Promise<usersT> | null;
}
