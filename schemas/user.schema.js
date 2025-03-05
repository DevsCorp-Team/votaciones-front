import { z } from "zod";

export class UserSchema {
    constructor () {
    }
    static validator ({ id, pin }) {
        const user = z.object({
            id: z.number(),
            pin: z.number().max(99999)            
        })
        return user.safeParse({ id, pin });
    }

    static personeria ({ id }) {
        const voto = z.object({ 
            id: z.number().min(1).max(6)
        })
        return voto.safeParse({ id })
    }
    static contraloria ({ id }) {
        const voto = z.object({
            id: z.number().min(1).max(5)
        })
        return voto.safeParse({ id })
    }

    static userState ({ id }) {
        const user = z.object({
            id: z.number()
        })
        return user.safeParse({ id });
    }
}