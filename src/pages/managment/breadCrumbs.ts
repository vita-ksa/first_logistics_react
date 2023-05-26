import {PageLink} from '_metronic/layout/core'

export const mainBreadCrumbs: Array<PageLink> = [
  {
    title: 'Products',
    path: '/products',
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

export const addProgramBreadCrumbs = [
  {
    title: 'Add Program',
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

export const getEditProgramBreadCrumbs = (name: string, id: string) => [
  {
    title: name,
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
  {
    title: name,
    path: '/programs-management/programs/details',
    isSeparator: false,
    isActive: true,
    state: {programName: name, id},
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
