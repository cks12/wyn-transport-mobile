import { Request, Response, NextFunction } from 'express';
import db from '../db';

async function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-api-key'];
    return next();
    if (key == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const valid = await db.apiKey.findUnique({
        where: {
            apiKey: key as string,
        },
        select: {
            id: true,
        }
    }).catch(err => null)

    if (valid == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();

}

export default verifyApiKey;