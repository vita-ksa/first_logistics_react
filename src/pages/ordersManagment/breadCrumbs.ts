import {PageLink} from '_metronic/layout/core'

export const mainBreadCrumbs: Array<PageLink> = [
  {
    title: 'Orders-Managment',
    path: '/orders',
    isSeparator: true,
    isActive: false,
  },
  {
    title: '',
    path: '/',
    isSeparator: false,
    isActive: false,
  },
]

export const getProgramProfileBreadCrumbs = (name: string) => [
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
    title: 'Programs Management',
    path: '/programs-management/programs',
    isSeparator: false,
    isActive: true,
  },
]

export const addOrderBreadCrumbs = [
  {
    title: 'Add Order',
    path: '/addOrders',
    isSeparator: true,
    isActive: true,
  },
  {
    title: 'Orders',
    path: '/orders',
    isSeparator: false,
    isActive: true,
  },
]

export const getEditProgramBreadCrumbs = (number: any) => [
  {
    title: `Order #${number}`,
    path: 'editOrders',
    isSeparator: true,
    isActive: true,
  },
  {
    title: 'Orders',
    path: '/orders',
    isSeparator: false,
    isActive: true,
  },
]

export const addClassBreadCrumbs = [
  {
    title: 'Add Class',
    path: '',
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
    title: 'Programs Management',
    path: '/programs-management/programs',
    isSeparator: false,
    isActive: true,
  },
]
export const programSettingsBreadCrumbs = [
  {
    title: 'Program Settings',
    path: '',
    isSeparator: true,
    isActive: true,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: true,
  },
]
