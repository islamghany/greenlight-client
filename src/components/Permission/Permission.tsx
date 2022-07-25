import { useAppSelector } from '@/store';
import { User } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { checkPermission } from './checkPermission';
import {
  Debug,
  EntityOwnerId,
  PermissionType,
  Roles,
} from './permission.types';

type PermissionProps = {
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
};
const Permission = (props: PermissionProps) => {
  const {
    children,
    noAccess,
    entityOwnerId,
    roles = [],
    type = 'one-of',
    debug = false,
  } = props;

  const user = useAppSelector((state) => state.user.user);
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
      debug,
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

export default Permission;
