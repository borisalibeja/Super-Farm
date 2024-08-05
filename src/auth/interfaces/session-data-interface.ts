import { SessionData } from "express-session";
import { Role } from "nest-access-control";


export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        firstName: string | null;
        lastName: string | null;
        username: string;
        password: string;
        role: Role | string;
        contactInfo: string | null;
    }

}