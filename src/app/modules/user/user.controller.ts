import { Request, Response } from "express";
import {userServicesData} from './user.service'
import { UserZodSchemaV } from "./user.validation";

// Create a user data 
const createUserData = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    //Validation zod data
     const zodParseData = UserZodSchemaV.parse(userData);
    const result = await userServicesData.createUserDataBD(zodParseData);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User create failed!",
      error: {
        code: 400,
        description: "User create failed!",
        error: error,
      },
    });
  }
};


//Get all user Data 
const getAllUserData = async (req: Request, res: Response) => {
  try {
    const result = await userServicesData.getAllUserDataDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//Get single user data
const getSingleUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServicesData.getSingleUserDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//Update single user Data
const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userServicesData.updateUserDataDB(userId, userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

//Delete single user Data
const deleteUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServicesData.DeleteUserDataDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

//Insert a order data collection
const insertOrderCollection = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const result = await userServicesData.insertOrderToUserDataC(
      userId,
      order
    );
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

//Get a user order data 
const getUserOrderData = async (req: Request, res: Response) => {
  try {
    const  {userId}  = req.params;
    const result = await userServicesData.getAllOrderToUserDataC(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

//Calculate a user order Data
const CalculateAllUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice =
      await userServicesData.calculateAllOrder(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// controller function export 
export const userControllerData = {
  createUserData,
  getAllUserData,
  getSingleUserData,
  updateUserData,
  deleteUserData,
  insertOrderCollection,
  getUserOrderData,
  CalculateAllUserOrder
};