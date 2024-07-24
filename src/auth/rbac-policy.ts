import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums/roles';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  .grant(Role.CUSTOMER)
    .readOwn('customerData')
  .grant(Role.FARMER)
    .extend(Role.CUSTOMER)
    .read('managedEmployeeData')
    .read('employeeDetails')
  .grant(Role.ADMIN)
    .extend(Role.FARMER)
    .read('customerData')
    .update('customerData')
    .delete('customerData')
  .deny(Role.ADMIN)
    .read('managedEmployeeData')
