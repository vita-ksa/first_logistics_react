import { PageLink } from '_metronic/layout/core'

export const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Users Management',
    path: '/user-management',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: true,
  },
]

export const getUserProfileBreadCrumbs = (name: string) => [
  {
    title: name,
    path: '/user-management',
    isSeparator: true,
    isActive: true,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: true,
  },
  {
    title: 'Users Management',
    path: '/user-management',
    isSeparator: false,
    isActive: true,
  },
]

export const addUserProfileBreadCrumbs = [
  {
    title: 'Add User',
    path: '/user-management',
    isSeparator: true,
    isActive: true,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: true,
  },
  {
    title: 'Users Management',
    path: '/user-management',
    isSeparator: false,
    isActive: true,
  },
]
