import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


export class AuthMiddleware {


    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');
        if (!authorization) return res.status(400).json('Token required')
        if (!authorization.startsWith('Bearer')) return res.status(401).json('Bearer token required')

        const token = authorization.split(' ')[1] || ''




        try {
            const payload = await JwtAdapter.validateToken<{ id: string}>(token);
            if (!payload) return res.status(401).json('Invalid token')
            const user = await UserModel.findById(payload.id)
            if(!user) return res.status(400).json({err: 'Invalid token - user not found'})


            req.body = {}
            req.body.payload = payload

            next()
        } catch (e) {
            console.log(e);
            res.status(500).json('Internal server error')

        }

    }
}