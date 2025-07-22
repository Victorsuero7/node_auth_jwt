import jwt from 'jsonwebtoken'
import { envs } from './envs';


const SEED = envs.JWT_SEED



export class JwtAdapter {

    static async generateToken(
        payload: object,
        duration: `${number}${'s' | 'm' | 'h' | 'd'}` = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token!)
            })
        })
    }



    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, SEED, (err, decoded) => {
                if (err) return resolve(null)

                return resolve(decoded as T)
            })
        })
    }
}