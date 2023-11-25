import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.routes';
const app:Application = express()
//const port = 3000
//parsers 
app.use(express.json());
app.use(cors())

//Application routes 
app.use("/api", userRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})
//export app 
export default app ; 
