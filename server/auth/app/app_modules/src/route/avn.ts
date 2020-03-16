import         express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/role', function(req:Request, res:Response, next:NextFunction) {
    res.json({
        route: 'avn/role',
    });
});

export default router;
