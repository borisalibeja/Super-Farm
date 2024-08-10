import { RolesBuilder } from 'nest-access-control';
import { Role } from '../enums/roles';


export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  .grant(Role.CUSTOMER)
  .create('farmData')
  .grant(Role.FARMER)
    .extend(Role.CUSTOMER)
    .delete('farmData')
    
  .grant(Role.ADMIN)
    .extend(Role.FARMER)

