<template>
  <section class="card-top">
    <div class="tbl-detail-box">
      <div class="tbl-detail-title">
        조건 설정
        <div class="tbl-btns">
          <a class="btn-md btn-secondary">조회</a>
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
          <th>사번</th>
          <td>
            <input type="text" placeholder="직원번호" class="w150px" />
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
    </q-table>
  </section>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
  import CallPeriodBox from 'components/CallPeriodBox.vue';

  const columns = [
    {
      name: 'edit_date',
      align: 'center',
      label: '수정일',
      field: 'edit_date',
      sortable: true,
    },
    {
      name: 'employee_number',
      align: 'center',
      label: '사번',
      field: 'employee_number',
      sortable: true,
    },
    {
      name: 'except',
      align: 'center',
      label: '제외 연락처',
      field: 'except',
      sortable: true,
    },
    {
      name: 'processing',
      align: 'center',
      label: '처리',
      field: 'processing',
      sortable: true,
    },
  ];

  const rows = [
    {
      edit_date: '2025-03-01 09:06',
      employee_number: 'I/B',
      except: 'N',
      processing: '00:00:00',
    },
  ];
</script>
