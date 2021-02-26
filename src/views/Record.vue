<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler()">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >Минимальное значение {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",

  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },

  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: "income",
    amount: 1,
    description: ""
  }),
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          console.log("!!!");
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });

          // расход или доход -считаем
          const newBill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          // кладем новое значение в базу
          await this.dispatch("updateInfo", { newBill });
          this.$message("Запись успешно создана!");
          // чистим форму
          this.$v.reset();
          this.amount = 1;
          this.description = "";
        } catch (error) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    }
  },

  computed: {
    ...mapGetters(["info"]),

    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    // подвинуть из очереди, чтобы форма точно прогрузилась
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  }
};
</script>
