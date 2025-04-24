const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        components: {
          main: () => import('pages/Home/main/MyPhonePage.vue'),
          detail: () => import('pages/Home/detail/DetailCall.vue')
        }
      },
      {
        path: 'myphone',
        components: {
          main: () => import('pages/Home/main/MyPhonePage.vue'),
          detail: () => import('pages/Home/detail/DetailCall.vue')
        }
      },
      {
        path: 'detailmsg',
        components: {
          main: () => import('pages/Home/main/MyPhonePage.vue'),
          detail: () => import('pages/Home/detail/DetailMsg.vue')
        }
      },
      {
        path: 'mobilebox',
        components: {
          main: () => import('pages/Home/main/MobileboxPage.vue'),
          detail: () => import('pages/Home/detail/DetailMobileList.vue')
        }
      }
    ],
  },
  {
    path: '/knowledge',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        components: {
          main: () => import('pages/knowledge/main/ManualPage.vue'),
          detail: () => import('pages/knowledge/detail/DetailManualList.vue')
        }
      },
      {
        path: 'manual',
        components: {
          main: () => import('pages/knowledge/main/ManualPage.vue'),
          detail: () => import('pages/knowledge/detail/DetailManualList.vue')
        }
      },
      {
        path: 'manual/:id',
        name: 'manualDetail',
        components: {
          main: () => import('pages/knowledge/main/ManualPage.vue'),
          detail: () => import('pages/knowledge/detail/DetailManual.vue')
        }
      },
      { path: 'case',
        components: {
          main: () => import('pages/knowledge/main/CasePage.vue'),
          detail: () => import('pages/knowledge/detail/DetailCaseList.vue')
        }
      },
      { path: 'guide',
        components: {
          main: () => import('pages/knowledge/main/GuidePage.vue'),
          detail: () => import('pages/knowledge/detail/DetailGuideList.vue')
        }
      },
      { path: 'law',
        components: {
          main: () => import('pages/knowledge/main/LawPage.vue'),
          detail: () => import('pages/knowledge/detail/DetailLawList.vue')
        }
      },
      { path: 'assistant',
        components: {
          main: () => import('pages/knowledge/main/AssistantPage.vue'),
          detail: () => import('pages/knowledge/detail/DetailAssistantList.vue')
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
          main: () => import('pages/analysis/main/HistoryPage.vue'),
          detail: () => import('pages/analysis/detail/DetailHistoryList.vue')
        }
      },
      { path: 'history',
        components: {
          main: () => import('pages/analysis/main/HistoryPage.vue'),
          detail: () => import('pages/analysis/detail/DetailHistoryList.vue')
        }
      },
      { path: 'statistics',
        components: {
          main: () => import('pages/analysis/main/StatisticsPage.vue'),
          detail: () => import('pages/analysis/detail/DetailStatisticsList.vue')
        }
      },
      { path: 'data',
        components: {
          main: () => import('pages/analysis/main/DataPage.vue'),
          detail: () => import('pages/analysis/detail/DetailDataList.vue')
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
          main: () => import('pages/settings/main/ExceptPage.vue'),
          detail: () => import('pages/settings/detail/DetailExceptList.vue')
        }
      },
      { path: 'except',
        components: {
          main: () => import('pages/settings/main/ExceptPage.vue'),
          detail: () => import('pages/settings/detail/DetailExceptList.vue')
        }
      },
      { path: 'exceptlog',
        components: {
          main: () => import('pages/settings/main/ExceptlogPage.vue'),
          detail: () => import('pages/settings/detail/DetailExceptlogList.vue')
        }
      },
      { path: 'workingtime',
        components: {
          main: () => import('pages/settings/main/WorkingtimePage.vue'),
          detail: () => import('pages/settings/detail/DetailWorkingtimeList.vue')
        }
      },
      { path: 'userstate',
        components: {
          main: () => import('pages/settings/main/UserstatePage.vue'),
          detail: () => import('pages/settings/detail/DetailUserstateList.vue')
        }
      },
      { path: 'device',
        components: {
          main: () => import('pages/settings/main/DevicePage.vue'),
          detail: () => import('pages/settings/detail/DetailDeviceList.vue')
        }
      },
      { path: 'menu',
        components: {
          main: () => import('pages/settings/main/MenuPage.vue'),
          detail: () => import('pages/settings/detail/DetailMobileList.vue')
        }
      },
      { path: 'knowledgeadmin',
        components: {
          main: () => import('pages/settings/main/KnowledgeadminPage.vue'),
          detail: () => import('pages/settings/detail/DetailKnowledgeadminList.vue')
        }
      },
      { path: 'usergroup',
        components: {
          main: () => import('pages/settings/main/UsergroupPage.vue'),
          detail: () => import('pages/settings/detail/DetailUsergroupList.vue')
        }
      },
      { path: 'mobilelog',
        components: {
          main: () => import('pages/settings/main/MobilelogPage.vue'),
          detail: () => import('pages/settings/detail/DetailMobilelogList.vue')
        }
      },
      { path: 'system',
        components: {
          main: () => import('pages/settings/main/SystemPage.vue'),
          detail: () => import('pages/settings/detail/DetailSystem.vue')
        }
      },
    ],
  },
  {
    path: '/adminLogin',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home/main/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
