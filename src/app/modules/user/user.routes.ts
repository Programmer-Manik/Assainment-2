import express from 'express';
import { userControllerData } from './user.controller';
const router = express.Router();
//Create user
router.post('/users', userControllerData.createUserData);
//Get all user data
router.get('/users', userControllerData.getAllUserData);
//Get single user
router.get('/users/:userId', userControllerData.getSingleUserData);
//Update user router
router.put('/users/:userId', userControllerData.updateUserData);
//Delete user
router.delete('/users/:userId', userControllerData.deleteUserData);
//Insert order user collection
router.put('/users/:userId/orders', userControllerData.insertOrderCollection);
//Get user order Data
router.get('/users/:userId/orders', userControllerData.getUserOrderData);

//User order price calculate
router.get(
  '/users/:userId/orders/total-price',
  userControllerData.CalculateAllUserOrder,
);
//Export routes
export const userRoutes = router;
