import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/roles';

// Define a constant key for the metadata
export const ROLES_KEY = 'roles';

// Implement the UseRoles decorator
export const UseRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


// import { Role } from 'nest-access-control';
// /**
//  * Define an access information required for this route.
//  * Notice that all Roles must be satisfied/passed
//  */
// export declare const UseRoles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
