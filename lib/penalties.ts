/**
 * Returns the number of penalty hours a user has based on their penalties. The mapping is as follows:
 * 0 penalty points: 0 hours
 * 1 penalty point: 3 hours
 * 2 penalty points: 12 hours
 * 3 or more penalty points: 1337 hours
 *
 * @param penalties
 * @returns Number of penalty hours based on the total penalty points
 */
export const penaltyHours = (penalties: number) => {
  if (penalties < 0) {
    throw new Error('Penalties cannot be negative');
  }

  if (penalties === 1) return 3;
  if (penalties === 2) return 12;
  else return 1337;
};
