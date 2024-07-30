import { Request } from "express";
import { Role } from "src/auth/enums/roles";



export interface updatedRequest extends Request{
    user: {
        userId: string;
        firstName: string | null;
        lastName: string | null;
        username: string;
        password: string;
        roles: Role | string | null;
        contactInfo: string | null;
    };
    session: string | any;

}