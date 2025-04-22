const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        components: {
          main: () => import('pages/MyPhonePage.vue'),
          detail: () => import('components/DetailCall.vue')
        }
      },
      {
        path: '/myphone',
        components: {
          main: () => import('pages/MyPhonePage.vue'),
          detail: () => import('components/DetailCall.vue')
        }
      },
      {
        path: '/detailmsg',
        components: {
          main: () => import('pages/MyPhonePage.vue'),
          detail: () => import('components/DetailMsg.vue')
        }
      },
      {
        path: '/mobilebox',
        components: {
          main: () => import('pages/MobileboxPage.vue'),
          detail: () => import('components/DetailMobileList.vue')
        }
      }
    ],
  },
  {
    path: '/knowledge',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        components: {
          main: () => import('pages/knowledge/ManualPage.vue'),
          detail: () => import('components/knowledge/DetailManualList.vue')
        }
      },
      { path: '/knowledge/manual',
        components: {
          main: () => import('pages/knowledge/ManualPage.vue'),
          detail: () => import('components/knowledge/DetailManualList.vue')
        }
      },
      { path: '/knowledge/case',
        components: {
          main: () => import('pages/knowledges/CasePage.vue'),
          detail: () => import('components/knowledge/DetailCaseList.vue')
        }
      },
      { path: '/knowledge/guide',
        components: {
          main: () => import('pages/knowledge/GuidePage.vue'),
          detail: () => import('components/knowledge/DetailGuideList.vue')
        }
      },
      { path: '/knowledge/law',
        components: {
          main: () => import('pages/knowledge/LawPage.vue'),
          detail: () => import('components/knowledge/DetailLawList.vue')
        }
      },
      { path: '/knowledge/assistant',
        components: {
          main: () => import('pages/knowledge/AssistantPage.vue'),
          detail: () => import('components/knowledge/DetailAssistantList.vue')
        }
      },
    ],
  },
  {
    path: '/analysis',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        components: {
          main: () => import('pages/analysis/HistoryPage.vue'),
          detail: () => import('components/analysis/DetailHistoryList.vue')
        }
      },
      { path: '/analysis/history',
        components: {
          main: () => import('pages/analysis/HistoryPage.vue'),
          detail: () => import('components/analysis/DetailHistoryList.vue')
        }
      },
      { path: '/analysis/statistics',
        components: {
          main: () => import('pages/analysis/StatisticsPage.vue'),
          detail: () => import('components/analysis/DetailStatisticsList.vue')
        }
      },
      { path: '/analysis/data',
        components: {
          main: () => import('pages/analysis/DataPage.vue'),
          detail: () => import('components/analysis/DetailDataList.vue')
        }
      }
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        components: {
          main: () => import('pages/settings/ExceptPage.vue'),
          detail: () => import('components/settings/DetailExceptList.vue')
        }
      },
      { path: '/settings/except',
        components: {
          main: () => import('pages/settings/ExceptPage.vue'),
          detail: () => import('components/settings/DetailExceptList.vue')
        }
      },
      { path: '/settings/exceptlog',
        components: {
          main: () => import('pages/settings/ExceptlogPage.vue'),
          detail: () => import('components/settings/DetailExceptlogList.vue')
        }
      },
      { path: '/settings/workingtime',
        components: {
          main: () => import('pages/settings/WorkingtimePage.vue'),
          detail: () => import('components/settings/DetailWorkingtimeList.vue')
        }
      },
      { path: '/settings/userstate',
        components: {
          main: () => import('pages/settings/UserstatePage.vue'),
          detail: () => import('components/settings/DetailUserstateList.vue')
        }
      },
      { path: '/settings/device',
        components: {
          main: () => import('pages/settings/DevicePage.vue'),
          detail: () => import('components/settings/DetailDeviceList.vue')
        }
      },
      { path: '/settings/menu',
        components: {
          main: () => import('pages/settings/MenuPage.vue'),
          detail: () => import('components/settings/DetailMobileList.vue')
        }
      },
      { path: '/settings/knowledgeadmin',
        components: {
          main: () => import('pages/settings/KnowledgeadminPage.vue'),
          detail: () => import('components/settings/DetailKnowledgeadminList.vue')
        }
      },
      { path: '/settings/usergroup',
        components: {
          main: () => import('pages/settings/UsergroupPage.vue'),
          detail: () => import('components/settings/DetailUsergroupList.vue')
        }
      },
      { path: '/settings/mobilelog',
        components: {
          main: () => import('pages/settings/MobilelogPage.vue'),
          detail: () => import('components/settings/DetailMobilelogList.vue')
        }
      },
      { path: '/settings/system',
        components: {
          main: () => import('pages/settings/SystemPage.vue'),
          detail: () => import('components/settings/DetailSystem.vue')
        }
      },
    ],
  },
  {
    path: '/adminLogin',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
