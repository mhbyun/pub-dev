import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useMenuListStore = defineStore('MenuList', {
  state: ()=>({
    menuList: [],
  }),
  getters: {
    getMenuList: (state) => state.menuList,
  },
  actions: {
    setMenuList(data){
      this.menuList = data;
    },
    cahngeMenuList(data) {
      this.menuList.push(data)
    },
    removeMenuList(data){
      this.menuList.splice(data, 1)
    },
    removeAllMenuList(data) {
      this.menuList = [];
    },
    async fetchMenuList() {
      this.loading = true;
      this.error = null;
      try {

        let objectParam = {sqlName: 'wisen.stat.manage.MenuSel',param:{ a:'a'}};

        const response = await api.post(`/wisen/api/searchList`, objectParam);

        let menuData = response.data.dataList

        // let menuData =
        // console.log("menuData : " , menuData);
        let sideList = [];


        const today = new Date();

        // 메뉴조회 사용여부, 만료날짜로 호출 하지 않음
        menuData.filter(menu => menu.depth === 1 && menu.use_yn === 'Y' && new Date(menu.expire_date) > today).forEach(parent => {
          const items = menuData
            .filter(menu =>{
              const isDepth2 = menu.depth === 2;
              const isCorrectParent = menu.pmenu_cd === parent.menu_cd;
              const isUsable = menu.use_yn === 'Y';
              const isNotExpired = new Date(menu.expire_date) > today;
              // console.log(`Checking menu: ${menu.menuname}, Depth 2: ${isDepth2}, Parent match: ${isCorrectParent}, Useable: ${isUsable}, Not expired: ${isNotExpired}`);
              return isDepth2 && isCorrectParent && isUsable && isNotExpired;
            })
            .map(menu => ({
              label: menu.menuname,
              path: menu.screen
            }));

          sideList.push({
            title: parent.menuname,
            route: parent.screen.charAt(0).toUpperCase() + parent.screen.slice(1),
            // iconClass: `ri-${parent.screen}-line`,
            items: items
          });

        });
        // console.log("sideList : " , sideList);
        return this.setMenuList(sideList);

      } catch (error) {
        console.error('Failed to fetch department list:', error);
        location.href = '/';
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    },
  },
},
{ persist: {
  enabled: true
}}
)
