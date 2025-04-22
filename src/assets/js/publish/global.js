import { exportFile, Loading, Notify, SessionStorage } from 'quasar'
import { api } from 'boot/axios'
import { saveAs } from 'file-saver'
// import * as XLSX from 'xlsx'
import XLSX from 'xlsx-js-style';

export const global = {
  s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  },
  exportExcel(excelHandler){
    // 1. Create a new workbook
    var wb = XLSX.utils.book_new();

    // 2. Get data
    var table = excelHandler.getExcelData();
    this.consoleLog("table : ", table);
    const ws = XLSX.utils.json_to_sheet(table);
    // ws['!autofilter'] = {ref : "A1:E1"};  //필터
    // 3. Apply styles
    const range = XLSX.utils.decode_range(ws['!ref']);

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
            const cell = ws[cellAddress];

            // If cell does not exist, create it
            if (!cell) cell = ws[cellAddress] = { t:'s',v: ''};

            // // Initialize cell style if not present
            cell.s = cell.s || {};

            // cell.s.border = {
            //     top: { style: "thin", color: { rgb: "000000" } },
            //     bottom: { style: "thin", color: { rgb: "000000" } },
            //     left: { style: "thin", color: { rgb: "000000" } },
            //     right: { style: "thin", color: { rgb: "000000" } },
            // };

            // Apply alignment
            cell.s.alignment = { horizontal: "center", vertical: "center" };

            // Set font size
            cell.s.font = { sz: 12 };

            // Apply background color to header rows
            if (rowNum === 0 || (excelHandler.rowTwo && rowNum === 1)) {
                cell.s.fill = {
                    patternType: "solid",
                    fgColor: { rgb: "b5bbc2" },
                    bgColor: { rgb: "b5bbc2" }
                };
            }

            // Assign the styled cell back to the worksheet
            // ws[cellAddress] = cell;
        }
    }

    //   // 4. 열 너비 설정
    // ws['!cols'] = [
    //     {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}
    // ];
    const numberOfCols = range.e.c + 1; // 데이터가 있는 열의 개수 계산
    ws['!cols'] = Array(numberOfCols).fill({ wpx: 120 }); // 모든 열의 너비를 150px로 동일하게 설정
    // 5. Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, excelHandler.getSheetName());

    // 6. Export the Excel file
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());

  },
  dateFormat(date) {
    return date.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3 $4:$5:$6')
  },
  ymdFormat(date) {

    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
  },
  timeFormat(time) {
    return time.substr(8,13).replace(/\B(?<!\.\d*)(?=(\d{2})+(?!\d))/g, ":");
  },
  commaFormat(count){
    return count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  },
  exportTable(columns,rows) {
    // naive encoding to csv format
    const content = [columns.map(col => this.wrapCsvValue(col.label))].concat(
      rows.map(row => columns.map(col => this.wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[ col.field === void 0 ? col.name : col.field ],
        col.format,
        row
      )).join(','))
    ).join('\r\n')

    const status = exportFile(
      'table-export.csv',
      content,
      {
        mimeType:'text/csv',
        byteOrderMark:'\uFeFF',
        encoding:'utf-8'
      }

    )

    if (status !== true) {
      $q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning'
      })
    }
  },
  wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
      ? formatFn(val, row)
      : val

    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
  },
  async searchByPrimaryKey(objectParam){
    return await api.post(`/wisen/api/search`, objectParam).then(res => {
      return this.isPrimaryKey = res.data.result != null?true:false;
    })
  },
  async onLogin(objectParam){
    return await api.post(`/wisen/api/auth/login`, objectParam)
  },
  async onPwdInit(objectParam){
    return await api.post(`/wisen/api/pwdInit`, objectParam)
  },
  async onGetCodeBook(objectParam){
    return await api.post(`/wisen/api/getCodeBook`, objectParam)
  },
  async onGetDeptList(objectParam){
    return await api.post(`/wisen/api/getDeptList`, objectParam)
  },
  async onCacheRefresh(objectParam){
    return await api.post(`/wisen/api/cacheRefresh`, objectParam)
  },
  async onGetQueueList(objectParam){
    return await api.post(`/wisen/api/getQueueList`, objectParam)
  },
  async onRegData(objectParam){
    return await api.post(`/wisen/api/regData`, objectParam)
  },
  async onSaveData(objectParam){
    return await api.post(`/wisen/api/saveData`, objectParam)
  },
  async onUserAdd(objectParam){
    return await api.post(`/wisen/api/userAdd`, objectParam)
  },
  async onRemoveData(objectParam){
    return await api.post(`/wisen/api/removeData`, objectParam)
  },
  async onPwdChg(objectParam){
    return await api.post(`/wisen/api/pwdChg`, objectParam)
  },
  async onSearchList(objectParam){
    return await api.post(`/wisen/api/searchList`, objectParam)
  },
  onUserInfo(){
    return api.post(`/wisen/api/auth/me`, {param:{}})
  },
  onLoadingShow(){
    if(!process.env.DEV){
      Loading.show();
    }
  },
  onLoadingHide(){
    if(!process.env.DEV){
      Loading.hide();
    }
  },
  onErrorAlert(err){
    // console.log("err : ", err);
    try{
      // if(!process.env.DEV){
        if(!err.code){
          global.onNotify(err, 'deep-orange-9');
        } else {
          global.onNotify("서버 오류, 서버 관리자에게 문의 요청", 'deep-orange-9');
        }
      // }
    }catch(e){
      console.log("error : ", e);
    }

  },
  onNotify(message, color){
    Notify.create({
      message: message,
      color: color,
      position: 'center',
      icon: 'announcement',
      timeout:500
    })
  },
  isEmptyObject(param) {
    return Object.keys(param).length === 0 && param.constructor === Object;
  },
  formatDate(date){
    const mymonth = date.getMonth() + 1;
    const myweekday = date.getDate();
    return `${mymonth < 10 ? '0' : ''}${mymonth}-${myweekday < 10 ? '0' : ''}${myweekday}`;
  },
  formatMonth(date){
    const mymonth = date.getMonth() + 1;
    return `${mymonth < 10 ? '0' : ''}${mymonth}`;
  },
  getNowWeek(data, type){

    let sDate = '';
    let eDate = '';
    const now = new Date();
    const nowDayOfWeek = now.getDay();
    const nowDay = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    const weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));

    sDate = `${weekStartDate.getFullYear()}-${type=='date'?global.formatDate(weekStartDate):global.formatMonth(weekStartDate)}`;
    eDate = `${weekEndDate.getFullYear()}-${type=='date'?global.formatDate(weekEndDate):global.formatMonth(weekEndDate)}`;

    return data?sDate:eDate
  },
  getLastMonth(data, type){

    let sDate = '';
    let eDate = '';
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();

    const firstDayOfMonth = new Date(nowYear, nowMonth, 1);
    const lastMonthEndDate = new Date(firstDayOfMonth.setDate(0));
    const lastMonthStartDate = new Date(lastMonthEndDate.getFullYear(), lastMonthEndDate.getMonth(), 1);

    sDate = `${lastMonthStartDate.getFullYear()}-${type=='date'?global.formatDate(lastMonthStartDate):global.formatMonth(lastMonthStartDate)}`;
    eDate = `${lastMonthEndDate.getFullYear()}-${type=='date'?global.formatDate(lastMonthEndDate):global.formatMonth(lastMonthEndDate)}`;

    return data?sDate:eDate
  },
  getThisMonth(data, type){

    let sDate = '';
    let eDate = '';
    const now = new Date();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const startOfMonth = new Date(nowYear, nowMonth, 1);
    const endOfMonth = new Date(nowYear, nowMonth + 1, 0);

    sDate = `${nowYear}-${type=='date'?global.formatDate(startOfMonth):global.formatMonth(startOfMonth)}`;
    eDate = `${nowYear}-${type=='date'?global.formatDate(endOfMonth):global.formatMonth(endOfMonth)}`;

    return data?sDate:eDate
  },
  getToday(){
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return  `${year}-${month}-${day}`;
  },
  getTodayAndTime(){
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  onToday(day){
    let sel_day = Number(-day);
    const today =new Date();
    today.setDate(today.getDate() + sel_day );
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
  },
  changeFormatDate(dateString){
    // console.log("dateString : ", dateString);

    // YYYY-MM-DD format (e.g., 2024-08-30)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString; // Output as-is
    }

    // 14자리 형태 (예: 20240903133000)
    if (/^\d{14}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const hours = dateString.substring(8, 10);
      const minutes = dateString.substring(10, 12);
      const seconds = dateString.substring(12, 14);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // 8자리 형태 (예: 20240604)
    if (/^\d{8}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}-${month}-${day}`;
    }

    // 6자리 형태 (예: 202406)
    if (/^\d{6}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      return `${year}-${month}`;
    }

    // ISO 8601 형태 (예: 2024-09-02T09:24:43)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(5, 7);
      const day = dateString.substring(8, 10);
      const hours = dateString.substring(11, 13);
      const minutes = dateString.substring(14, 16);
      const seconds = dateString.substring(17, 19);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    // 잘못된 형식의 경우
    return '-';
  },
  radioDateChange(data, type){

    let returnData = {startDate : '', endDate: ''}
    switch(data){
      case '1R':
        returnData.startDate = type=='date'?global.getToday():global.getThisMonth(true, type)
        returnData.endDate =  type=='date'?global.getToday():global.getThisMonth(true, type)
        break;
      case '2R':
        returnData.startDate = type=='date'?global.getNowWeek(true, type):global.getNowWeek(true, type)
        returnData.endDate = type=='date'?global.getNowWeek(false, type):global.getNowWeek(false, type)
        break;
      case '3R':
        returnData.startDate = type=='date'?global.getThisMonth(true, type):global.getThisMonth(true, type)
        returnData.endDate = type=='date'?global.getThisMonth(false, type):global.getThisMonth(false, type)
        break;
      case '4R':
        returnData.startDate = type=='date'?global.getLastMonth(true, type):global.getLastMonth(true, type)
        returnData.endDate = type=='date'?global.getLastMonth(false, type):global.getLastMonth(false, type)
        break;
      default:
        break;
    }
    return returnData;
  },
  getDateDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffTime = Math.abs(d2 - d1); // 두 날짜 간의 차이를 밀리초로 계산
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 일수로 변환

    return diffDays;
  },
  convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.ceil(seconds % 60);

    // 조건에 따라 문자열을 다르게 반환
    // if (hours === 0 && minutes === 0) {
    //   return `${remainingSeconds}초`;
    // } else if (hours === 0) {
    //   return `${minutes}분 ${remainingSeconds}초`;
    // } else {
      // return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
    // }
    return `${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}:${remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds}`;
  },
  splitByDepth(data) {
    // Initialize an empty object to store arrays by depth
    const depthMap = {};

    // Iterate over each item in the data array
    data.forEach(item => {
        const depth = item.depth;

        // If the depth does not yet exist in the map, create an empty array for it
        if (!depthMap[depth]) {
            depthMap[depth] = [];
        }

        // Push the current item into the appropriate depth array
        depthMap[depth].push(item);
    });

    // Convert the depth map into an array of arrays
    const result = Object.keys(depthMap)
        .sort((a, b) => a - b) // Sort by depth to maintain order
        .map(key => depthMap[key]);

    return result;
  },
  consoleLog(memo, data){
    if(process.env.DEV){
      console.log(memo, data)
    }
  },
  scrollToTop() {
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  },
  async onLogout() {

    let data = {
      "param": {
        "user_id": localStorage.getItem('userId')
      }
    }

    // try {
    //   const res = await global.onUserInfo();
    //   data.param.user_id = res.data.userId;
    // } catch (error) {
    //   if(error.code == "ERR_BAD_REQUEST" || error.code == "ERR_NETWORK"){
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     location.href = '/';
    //     return;
    //   }

    //   global.consoleLog("에러", error);
    //   global.onLoadingHide();
    //   global.errorFn(error);

    //   return;
    // }

    try {
      const response = await api.post(`/wisen/api/auth/logout`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Refresh': localStorage.getItem('refreshToken'),
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });

      if (response.data.message !== '로그아웃 성공') {
        return global.onNotify(response.data.message, 'deep-orange-9');
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      location.href = '/';
    } catch (error) {
      console.log("로그아웃 : ", error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      location.href = '/';
      // Optional: Handle the error (e.g., retry logout or show a message)
    }
  },
  async onJWTRefresh(){

    let data = {
      "param": {
        "user_id": localStorage.getItem('userId')
      }
    }

    // try {
    //   const res = await global.onUserInfo();
    //   data.param.user_id = res.data.userId;
    // } catch (error) {
    //   if(error.code === "ERR_BAD_REQUEST"){
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     location.href = '/';
    //     return;
    //   }

    //   global.consoleLog("에러", error);
    //   global.onLoadingHide();
    //   global.errorFn(error);
    //   return;
    // }

    try {
      const response = await api.post(`/wisen/api/auth/refresh`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Refresh': localStorage.getItem('refreshToken'),
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });


      localStorage.setItem('accessToken',  response.data.accessToken);
      localStorage.setItem('refreshToken',  response.data.refreshToken);
      location.reload();
    } catch (error) {
      global.onErrorAlert(error);
      global.onLogout();

    }
  },
  errorFn(error){
    global.consoleLog('errorFn : ', error)


    if(error.response && error.response.status !== undefined){
      if(error.response.status == 401 && error.message === 'Request failed with status code 401'){
        this.onJWTRefresh();
      } else {
        global.onErrorAlert(error);
      }
    } else {
    }
  },
  formatPercentage(oneCnt, twoCnt){
    if (isNaN(oneCnt) || isNaN(twoCnt) || twoCnt === 0) {
      return 0;
    }

    const percentage = (oneCnt / twoCnt) * 100;

    // 정수로 딱 떨어질 때는 소수점 없이 출력, 아니면 소수점 두 자리 출력
    return Math.floor(percentage) === percentage
      ? parseInt(percentage)
      : percentage.toFixed(2);
  },
  onePercentRate(rate){
    if (isNaN(rate)) {
      return 0;
    }

    const number = Number(rate);
    // 정수로 딱 떨어질 때는 소수점 없이, 아니면 소수점 두 자리 출력
    return Math.floor(number) === number ? parseInt(number) : number.toFixed(2);
  }
}
