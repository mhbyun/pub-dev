<template>
  <section class="card-top" :class="open ? 'active' : ''">
    <div class="tbl-detail-box">
      <div class="tbl-detail-title">
        조건 설정
        <div class="tbl-btns">
          <a class="btn-md btn-secondary">조회</a>
          <a
            class="btn-md btn-basic ico-arrow"
            @click="open = !open"
            :class="open ? 'active' : ''"
            >상세검색</a
          >
        </div>
      </div>
      <table class="tbl-detail">
        <colgroup>
          <col style="" />
          <col style="width: 33%" />
          <col style="" />
          <col style="width: 33%" />
          <col style="" />
          <col style="" />
        </colgroup>
        <tr>
          <th>기간</th>
          <td>
            <CallPeriodBox />
          </td>
          <th>검색</th>
          <td>
            <div class="form-mix">
              <select class="w150px">
                <option>사원</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <input type="text" placeholder="직원이름" class="w150px" />
            </div>
          </td>

          <th>직원번호</th>
          <td><input type="text" placeholder="직원번호" class="w150px" /></td>
        </tr>
        <tr>
          <th>통화유형</th>
          <td>
            <select class="w150px">
              <option>인바운드</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>

          <th>통화연결</th>
          <td>
            <select class="w150px">
              <option>전체</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>
          <th></th>
          <td></td>
        </tr>
      </table>
    </div>

    <div class="tbl-detail-box mt40 toggle-box" v-show="open">
      <div class="tbl-detail-title">상세 조건 설정</div>
      <table class="tbl-detail">
        <colgroup>
          <col style="" />
          <col style="width: 33%" />
          <col style="" />
          <col style="width: 33%" />
          <col style="" />
          <col style="" />
        </colgroup>
        <tr>
          <th>접수번호</th>
          <td>
            <input type="text" placeholder="25040101-1234" class="w150px" />
          </td>
          <th>제외대상</th>
          <td>
            <select class="w150px">
              <option>Y</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>

          <th>번호유형</th>
          <td>
            <select class="w150px">
              <option>010번호</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>고객번호</th>
          <td>
            <input type="text" placeholder="25040101-1234" class="w150px" />
          </td>

          <th>고객구분</th>
          <td>
            <select class="w150px">
              <option>파트너</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>
          <th></th>
          <td></td>
        </tr>
      </table>
    </div>
  </section>

  <section class="card board-list-card">
    <q-table
      title="검색결과"
      style="height: 100%"
      flat
      separator="cell"
      :rows="rows"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :hide-pagination="true"
      class="table-wrap type-data"
      @row-click="openPopupHistory()"
    >
      <template v-slot:top-right>
        <a class="btn-sm btn-soft ico-download" @click="exportTable"
          >엑셀 다운로드</a
        >
      </template>
      <template v-slot:header="props">
        <q-tr>
          <q-th colspan="6" class="center">통화기본정보</q-th>
          <q-th colspan="7" class="center">매핑정보</q-th>
          <q-th colspan="5" class="center">통화분류</q-th>
        </q-tr>
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <!-- <template v-slot:bottom-row>
        <q-tr>
          <q-td>합계</q-td>
        </q-tr>
      </template> -->
    </q-table>
  </section>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
  import CallPeriodBox from 'components/CallPeriodBox.vue';
  import { exportFile, useQuasar } from 'quasar';
  import { usePopupStore } from 'stores/popup';
  import { POPUP_TYPES } from 'assets/js/publish/popupTypes';

  const open = ref(false);
  const columns = [
    {
      name: 'time',
      align: 'center',
      label: '수행일시',
      //required: true,
      field: 'time',
      // format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'category',
      align: 'center',
      label: '유형',
      field: 'category',
      sortable: true,
    },
    {
      name: 'connect',
      align: 'center',
      label: '연결여부',
      field: 'connect',
      sortable: true,
    },
    {
      name: 'call_time',
      align: 'center',
      label: '통화시간',
      field: 'call_time',
    },
    { name: 'phone', align: 'center', label: '고객연락처', field: 'phone' },
    { name: 'manger', align: 'center', label: '보상담당자', field: 'manager' },
    {
      name: 'office_hours',
      align: 'center',
      label: '업무시간여부',
      field: 'office_hours',
      // sortable: true,
      // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    },
    {
      name: 'call_target',
      align: 'center',
      label: '통화대상',
      field: 'call_target',
    },
    {
      name: 'map_categoty',
      align: 'center',
      label: '매핑유형',
      field: 'map_categoty',
    },
    {
      name: 'receipt_number',
      align: 'center',
      label: '접수번호',
      field: 'receipt_number',
    },
    {
      name: 'customer',
      align: 'center',
      label: '고객구분',
      field: 'customer',
    },
    {
      name: 'guide_target',
      align: 'center',
      label: '안내대상',
      field: 'guide_target',
    },
    {
      name: 'customer_name',

      align: 'center',
      label: '고객성명',
      field: 'customer_name',
    },
    {
      name: 'category1',
      align: 'center',
      label: '유형분류1',
      field: 'category1',
    },
    {
      name: 'category2',
      align: 'center',
      label: '유형분류2',
      field: 'category2',
    },
    {
      name: 'category3',
      align: 'center',
      label: '유형분류3',
      field: 'category3',
    },
    {
      name: 'category4',
      align: 'center',
      label: '유형분류4',
      field: 'category4',
    },
    {
      name: 'category5',
      align: 'center',
      label: '유형분류5',
      field: 'category5',
    },
  ];

  const rows = [
    {
      time: '2025-03-01 09:06',
      category: 'I/B',
      connect: 'N',
      call_time: '00:00:00',
      phone: '02-0000-0000',
      manager: '김호랑 부산보상센터',
      office_hours: 'N',
      call_target: '고객',
      map_categoty: '-',
      receipt_number: '2025-0101012323',
      customer: '피보험자',
      guide_target: '자녀',
      customer_name: '홍길동',
      category1: '유선합의',
      category2: '개인정보동의',
      category3: '-',
      category4: '-',
      category5: '-',
    },
  ];

  function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }

  function exportTable() {
    // naive encoding to csv format
    const content = [columns.map((col) => wrapCsvValue(col.label))]
      .concat(
        rows.map((row) =>
          columns
            .map((col) =>
              wrapCsvValue(
                typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format,
                row,
              ),
            )
            .join(','),
        ),
      )
      .join('\r\n');

    const status = exportFile('table-export.csv', content, 'text/csv');

    if (status !== true) {
      $q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }

  const popup = usePopupStore();

  const openPopupHistory = () => {
    popup.open(POPUP_TYPES.HISTORY, {});
  };

  // 팝업 결과 수신
  watch(
    () => popup.result,
    (newVal) => {
      if (newVal) {
        console.log('팝업에서 받은 결과:', newVal);
        // popup.result = null  // 필요 시 초기화
      }
    },
  );
</script>

<style>
  .toggle-box {
    position: absolute;
    left: 0;
    top: 160px;
    z-index: 10;
    width: 100%;
    border-radius: 0 0 10px 10px;
    /* background: #fafafa; */
  }
</style>
