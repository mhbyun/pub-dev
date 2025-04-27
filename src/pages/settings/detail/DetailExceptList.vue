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
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      virtual-scroll
      :hide-pagination="true"
      class="table-wrap type-data"
    >
      <template v-slot:top-right>
        <a class="btn-sm btn-soft">삭제</a>
      </template>
      <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
    </q-table>
  </section>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
  import CallPeriodBox from 'components/CallPeriodBox.vue';

  const columns = [
    {
      name: 'except',
      align: 'center',
      label: '제외번호',
      field: 'except',
      sortable: true,
    },
    {
      name: 'setting',
      align: 'center',
      label: '설정',
      field: 'setting',
      sortable: true,
    },
    {
      name: 'date',
      align: 'center',
      label: '등록날짜',
      field: 'date',
      sortable: true,
    },
    {
      name: 'note',
      align: 'center',
      label: '비고',
      field: 'note',
      sortable: true,
    },
  ];

  const rows = [
    {
      except: '2025-03-01 09:06',
      setting: 'I/B',
      date: 'N',
      note: '00:00:00',
    },
  ];
  const selected = ref([]);

  function getSelectedString() {
    return selected.value.length === 0
      ? ''
      : `${selected.value.length} record${
          selected.value.length > 1 ? 's' : ''
        } selected of ${rows.length}`;
  }
</script>
