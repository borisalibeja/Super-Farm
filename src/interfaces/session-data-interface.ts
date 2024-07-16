import { SessionData } from "express-session";
import { Role } from "src/auth/enums";


export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        username: string;
        roles: Role;
    }

}