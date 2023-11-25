import { usersT } from "./user.interface";
import { user} from "./user.model";

//Create a user to database
const createUserDataBD = async (userData: usersT) => {
  const result =await user.create(userData);
  console.log({result})
  return result;
};

//Get all user database
const getAllUserDataDB = async () => {
  const result = user.find().select(
    "userId username fullName age email address"
  );
  return result;
};

//Get single user Database
const getSingleUserDB = async (userId: number | string) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = user.findOne({ userId });
  return result;
};

//Update single user database
const updateUserDataDB = async (userId: number | string, userData: usersT) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = user.findOneAndUpdate(
    { userId },
    {
      $set: userData,
    },
    { new: true, runValidators: true }
  );
  return result;
};

//Delete single user database
const DeleteUserDataDB = async (userId: number | string) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = user.findOneAndDelete({ userId });
  return result;
};

//Insert Order to  user data collection
const insertOrderToUserDataC = async (
  userId: number | string,
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  }
) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const { productName, price, quantity } = orderData;
  const result = user.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true }
  );
  return result;
};

//Get  user all orders Data
const getAllOrderToUserDataC = async (userId: number | string) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = user.findOne({ userId }).select("orders");
  return result;
};

//User all orders price calculate  
const calculateAllOrder = async (userId: number | string) => {
  const userExists = await user.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = await user.findOne({ userId }).select("orders");

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number }) => {
      return total + (order.price || 0);
    },
    0
  );
  return totalPrice;
};

//Service function export 
export const userServicesData = {
  createUserDataBD,
  getAllUserDataDB,
  getSingleUserDB,
  updateUserDataDB,
  DeleteUserDataDB,
  insertOrderToUserDataC,
  getAllOrderToUserDataC,
  calculateAllOrder,
};