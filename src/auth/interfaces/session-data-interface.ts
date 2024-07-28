import { SessionData } from "express-session";
import { Role } from "src/auth/enums/roles";


export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        username: string;
        roles: Role;
        farmId: string | 'Unknown';
        farmName: string | 'Unknown' ;
    }

}