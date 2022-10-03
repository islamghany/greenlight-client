import { useAppSelector } from '@/store';
import { useGetCurrentUserQuery } from '@/store/api';
import { User } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { checkPermission } from './checkPermission';
import {
  Debug,
  EntityOwnerId,
  PermissionType,
  Roles,
} from './permission.types';

interface PermissionPropsWrapper {
  children: React.ReactElement;
  noAccess?:
    | React.ReactElement
    | ((args: {
        user: User | undefined;
        hasAccess: boolean;
      }) => React.ReactElement);
  roles: Roles;
  type?: PermissionType;
  entityOwnerId?: EntityOwnerId;
  debug?: Debug;
}

const PermissionWrapper = (props: PermissionPropsWrapper) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <Permission {...props} user={user}>
      {props.children}
    </Permission>
  );
};

interface PermissionProps extends PermissionPropsWrapper {
  user: User | undefined;
}
const Permission = (props: PermissionProps) => {
  const {
    children,
    noAccess,
    entityOwnerId,
    roles = [],
    type = 'one-of',
    debug = false,
    user,
  } = props;

  const isMounted = useRef<boolean>(false);
  const [hasAccess, setHasAccess] = useState(
    checkPermission(user, roles, { debug, entityOwnerId, type })
  );
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    let doseUserHasAccess = checkPermission(user, roles, {
      entityOwnerId,
      type,
    });
    setHasAccess(doseUserHasAccess);
  }, [user?.id, entityOwnerId, type]);

  const renderNoAccess = () => {
    if (typeof noAccess === 'function') {
      return noAccess({ user, hasAccess });
    }
    return noAccess;
  };

  return hasAccess ? children : renderNoAccess() || null;
};

export default PermissionWrapper;
