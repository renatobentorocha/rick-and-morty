export function sortByString(a: string, b: string, revert = 1) {
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();

  // ascending order
  if (nameA < nameB) {
    return -1 * revert;
  }

  if (nameA > nameB) {
    return 1 * revert;
  }

  return 0;
}
