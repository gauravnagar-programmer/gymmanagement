import { Router } from "express";
import  login from "../controllers/authController.js";
import loginSchema from "../middlewares/authValidator.js"
import validate  from '../middlewares/Loginvalidate.js';
import Limiting from "../middlewares/RequestLimiting.js"
import adminTokenValidation from "../middlewares/adminTokenValidation.js";
import memberAdd from "../controllers/memberAdd.js";
import memberValidate from "../middlewares/memberValidate.js";
import memberSchema from "../middlewares/memberValidator.js";
import {memberList , memberDetails} from "../controllers/memberList.js";
import memberDelete from "../controllers/memberDelete.js";
import memberUpdate from "../controllers/memberUpdate.js";


const route = Router()


route.post('/login',Limiting,validate(loginSchema),login)
route.get('/members/all',adminTokenValidation,memberList)
route.delete('/members/delete/:id',adminTokenValidation,memberDelete)
route.get('/members/update/details/:id',adminTokenValidation,memberDetails) 
route.put('/member/update/:id',adminTokenValidation,memberUpdate)
route.post('/member/add',adminTokenValidation,Limiting,memberValidate(memberSchema),memberAdd)

export default route