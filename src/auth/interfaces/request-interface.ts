import { Request } from "express";
import { Role } from "src/auth/enums/roles";



export interface updatedRequest extends Request{
    user: {
        userId: string;
        username: string;
        password: string;
        roles: Role | string | null;
        farmId: string | 'Unknown' | null;
        userFarmName: string | 'unknown' | null;
        contactInfo: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    session: string | any;

}