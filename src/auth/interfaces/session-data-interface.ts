import { SessionData } from "express-session";
import { Role } from "src/auth/enums/roles";


export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        firstName: string | null;
        lastName: string | null;
        username: string;
        password: string;
        roles: Role | string | null;
        contactInfo: string | null;
    }

}