export interface StaffPermissions {
  name: string;
  admin: boolean;
  dispatch: boolean;
  people: boolean;
  finance: boolean;
  intel: boolean;
}

// Which modules grant access to each route.
// Admin bypass is checked separately — not listed here.
export const MODULE_ROUTES: Record<string, (keyof StaffPermissions)[]> = {
  '/live':             ['dispatch'],
  '/schedule':         ['dispatch'],
  '/feedback':         ['dispatch'],
  '/weekly-schedule':  ['people'],
  '/calendar':         ['people'],
  '/team':             ['people'],
  '/compliance':       ['people'],
  '/hr':               ['people'],
  '/billing':          ['finance'],
  '/intel':            ['intel', 'finance'],
};

export function hasAccess(perms: StaffPermissions | null | undefined, pathname: string): boolean {
  if (!perms) return false;
  if (perms.admin) return true;
  const required = MODULE_ROUTES[pathname];
  if (!required) return true; // Unknown route: allow (fail-open for non-protected paths)
  return required.some(mod => perms[mod] === true);
}

export function defaultRoute(perms: StaffPermissions | null | undefined): string {
  if (!perms) return '/login';
  if (perms.admin || perms.dispatch) return '/live';
  if (perms.people) return '/hr';
  if (perms.finance) return '/billing';
  if (perms.intel) return '/intel';
  return '/login';
}
