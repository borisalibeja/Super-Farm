import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums/roles';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  .grant(Role.CUSTOMER)
    .read('customerData')
    .createAny('customerData')
    .createAny('farmData')
    .create('farmData')
    .update('customerData')
    .delete('customerData')
    .read('productData')
    .read('farmData')
  .grant(Role.FARMER)
    .extend(Role.CUSTOMER)
    .createAny('productData')
    .update('productData')
    .delete('productData')
    .delete('farmData')
    .update('farmData')
  .grant(Role.ADMIN)
    .extend(Role.FARMER)
    .read('customerData')
    .update('customerData')
    .delete('customerData')
    .read('productData')
    .update('productData')
    .delete('productData')
    .read('farmData')
    .update('farmData')

  .deny(Role.ADMIN)
    .create('productData')
