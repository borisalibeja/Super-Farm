import { SessionData } from "express-session";
import { Role } from "../enums/roles";




export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        firstName: string | null;
        lastName: string | null;
        username: string;
        password: string;
        role: Role[];
        contactInfo: string | null;
    }

}