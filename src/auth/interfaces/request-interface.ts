import { Request } from "express";
import { Role } from "src/auth/enums/roles";



export interface updatedRequest extends Request{
    user: {
        userId: string;
        username: string;
        roles: Role;
    } | any;
    session: string | any;

}