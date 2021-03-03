<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, idx) of records" :key="record.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ record.amount | currencyFilter() }}</td>
          <td>{{ record.date | dateFilter("datetime") }}</td>
          <td>{{ record.categoryName }}</td>
          <td>
            <span :class="[record.typeClass]" class="white-text badge red">{{
              record.typeText
            }}</span>
          </td>
          <td>
            <button
              v-tooltip="'Посмотреть запись'"
              class="btn-small btn"
              @click="$router.push('detail/' + record.id)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
};
</script>
