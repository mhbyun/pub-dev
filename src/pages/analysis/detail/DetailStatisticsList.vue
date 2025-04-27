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
          <th>조회구분</th>
          <td>
            <div class="form-mix">
              <label class="radio-item">
                <input type="radio" name="radio1" checked />
                <span>시간별</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="radio1" />
                <span>일자별</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="radio1" />
                <span>월간별</span>
              </label>
            </div>
          </td>

          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>검색</th>
          <td>
            <div class="form-mix">
              <select class="w150px">
                <option>부서서</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <input type="text" placeholder="검색" class="w150px" />
            </div>
          </td>

          <th>직원번호</th>
          <td>
            <input type="text" placeholder="직원번호" class="w150px" />
          </td>
          <th>통화유형</th>
          <td>
            <select class="w150px">
              <option>전체</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </td>
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
    >
      <template v-slot:header="props">
        <q-tr>
          <q-th></q-th>
          <q-th colspan="3" class="center">구분</q-th>
          <q-th colspan="7" class="center">통화건수</q-th>
          <q-th colspan="3" class="center">통화시간</q-th>
        </q-tr>
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:bottom-row>
        <q-tr class="sum">
          <q-td class="text-center">합계</q-td>
          <q-td class="text-center">-</q-td>
          <q-td class="text-center">-</q-td>
          <q-td class="text-center">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-right">-</q-td>
          <q-td class="text-center">-</q-td>
          <q-td class="text-center">-</q-td>
          <q-td class="text-center">-</q-td>
        </q-tr>
      </template>
    </q-table>
  </section>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
  import CallPeriodBox from 'components/CallPeriodBox.vue';

  const open = ref(false);
  const columns = [
    {
      name: 'time',
      align: 'center',
      label: '일자',
      field: 'time',
    },
    {
      name: 'org',
      align: 'center',
      label: '조직',
      field: 'org',
    },
    {
      name: 'employee_number',
      align: 'center',
      label: '사번',
      field: 'employee-number',
    },
    {
      name: 'name',
      align: 'center',
      label: '이름',
      field: 'name',
    },
    { name: 'total', align: 'right', label: '총건수', field: 'total' },
    {
      name: 'ib_receive',
      align: 'right',
      label: 'IB수신',
      field: 'ib_receive',
    },
    {
      name: 'ob_try',
      align: 'right',
      label: 'OB시도',
      field: 'ob_try',
      // sortable: true,
      // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    },
    {
      name: 'ib_success',
      align: 'right',
      label: 'IB성공',
      field: 'ib_success',
    },

    {
      name: 'ob_success',
      align: 'right',
      label: 'OB성공',
      field: 'ob_success',
    },
    {
      name: 'ib_missing',
      align: 'right',
      label: 'IB미통화',
      field: 'ib_missing',
    },
    {
      name: 'ob_missing',
      align: 'right',
      label: 'OB미통화',
      field: 'ob_missing',
    },
    {
      name: 'total_time',
      align: 'center',
      label: '총시간',
      field: 'total_time',
    },
    {
      name: 'ib',
      align: 'center',
      label: 'IB',
      field: 'ib',
    },
    {
      name: 'ob',
      align: 'center',
      label: 'OB',
      field: 'ob',
    },
  ];

  const rows = [
    {
      time: '2025-03-01 09:06',
      org: 'IT_보상상',
      employee_number: '1111',
      name: '홍길동동',
      total: '10',
      ib_receive: '5',
      ob_try: '5',
      ib_success: '5',
      ob_success: '5',
      ib_missing: '5',
      ob_missing: '5',
      total_time: '10:00:00',
      ib: '10:00:00',
      ob: '10:00:00',
    },
  ];
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
