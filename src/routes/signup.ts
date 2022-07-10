import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
	res.send(req.body);
});

export { router as signup };
