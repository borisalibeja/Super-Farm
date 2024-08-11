import { RolesBuilder } from 'nest-access-control';
import { Role } from '../enums/roles';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  .grant(Role.CUSTOMER)
    .create('customerData')
    .read('customerData')
    .update('customerData')
    .delete('customerData')
    .create('farmData')
    .read('farmData')
    .read('productData')
  .grant(Role.FARMER)
    .extend(Role.CUSTOMER)
    .create('productData')
    .update('productData')
    .delete('productData')
    .update('farmData')
    .delete('farmData')
  .grant(Role.ADMIN)
    .extend(Role.FARMER)
    .update('customerData')
    .delete('customerData')
    .update('productData')
    .delete('productData')
    .update('farmData')

  .deny(Role.ADMIN)
    .create('productData')
    .create('farmData')
    .create('customerData')
