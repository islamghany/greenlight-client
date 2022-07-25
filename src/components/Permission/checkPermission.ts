import { User } from '@/types';
import { CheckPermissionConfig, Roles } from './permission.types';

const permissionCheckTypeMethods = {
  'one-of': (roles: Roles) => roles.some,
  'all-of': (roles: Roles) => roles.every,
};

export const checkPermission = (
  user: User | undefined,
  roles: Roles,
  config: CheckPermissionConfig = {}
) => {
  const { type = 'one-of', debug, entityOwnerId } = config;

  const checkMethod =
    permissionCheckTypeMethods?.[type] || permissionCheckTypeMethods['one-of'];

  const userRoles = user ? ['logged-in'] : ['logged-out'];

  const hasAccess = checkMethod(roles).bind(roles)((role) => {
    if (role === 'owner') {
      return String(user?.id) === String(entityOwnerId);
    }

    if (role === 'logged-in') {
      return Boolean(user?.id);
    }

    return userRoles.includes(role);
  });

  debug &&
    console.log('PERMISSION_DEBUG', {
      hasAccess,
      requiredRoles: roles,
      userRoles,
      type,
      entityOwnerId,
    });
  return hasAccess;
};
