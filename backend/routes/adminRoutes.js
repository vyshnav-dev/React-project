import  express from "express";

const router = express.Router();
import { authAdmin,logoutAdmin,userData } from "../controllers/adminController.js";





router.post('/admin',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/admin',userData)



export default router;