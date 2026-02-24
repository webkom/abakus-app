import { EventPoolWithRegistrations, EventPoolRegistrationWithUser } from './types/types';
import { PublicUserWithAbakusGroups } from './types/user';

const isPermittedInPool = (user: PublicUserWithAbakusGroups, pool: EventPoolWithRegistrations) => {
  return pool.allPermissionGroupIds.some((permissionGroupId) =>
    user.abakusGroups?.some((g) => g.id === permissionGroupId)
  );
};

export const getWaitingListPosition = (
  currentRegistration?: EventPoolRegistrationWithUser,
  waitingList?: EventPoolWithRegistrations,
  pools?: EventPoolWithRegistrations[]
) => {
  if (!currentRegistration || !waitingList || !pools) return undefined;
  if (!waitingList.registrations.includes(currentRegistration)) return undefined;

  const nonWaitingListPools = pools.filter((pool) => !pool.isWaitingList);

  const applicablePools = nonWaitingListPools.filter((pool) =>
    isPermittedInPool(currentRegistration.user, pool)
  );

  if (applicablePools.length === 0) return undefined;
  if (nonWaitingListPools.length === 1) {
    return waitingList.registrations.indexOf(currentRegistration) + 1;
  }
  return applicablePools.map((pool) => {
    const applicableWaitingListRegistrations = waitingList.registrations.filter((registration) =>
      isPermittedInPool(registration.user, pool)
    );
    return {
      poolName: pool.name,
      position: applicableWaitingListRegistrations.indexOf(currentRegistration) + 1,
    };
  });
};
