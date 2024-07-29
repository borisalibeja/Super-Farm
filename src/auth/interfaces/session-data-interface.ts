import { SessionData } from "express-session";
import { Role } from "src/auth/enums/roles";


export interface updatedSessionData extends SessionData {
    user: {
        userId: string;
        username: string;
        password: string;
        roles: Role | string | null;
        farmId: string | 'Unknown' | null;
        userFarmName: string | 'Unknown' | null;
        contactInfo: string | null;
        firstName: string | null;
        lastName: string | null;
    }

}