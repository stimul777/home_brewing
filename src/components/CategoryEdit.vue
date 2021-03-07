<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "CategoryEdit_comp_edit" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id"
              >{{ cat.title }}
            </option>
          </select>
          <label>{{ "CategoryEdit_comp_select_category" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "Category_comp_name" | localize }} </label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >{{ "CategoryEdit_comp_edit_warning" | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Category_comp_limit" | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{ "CategoryEdit_comp_edit_min_value" | localize }}
            {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Profile_update" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: ["categories"],
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null
  }),

  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);

        this.$message("Категория успешно обновлена!");
        this.$emit("updatedSucess", categoryData);
      } catch (error) {}
    }
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    // делает input активным при рендеренге v-model со значением
    M.updateTextFields();
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },

  watch: {
    // следим за изменением значений select
    current(catId) {
      const { id, title, limit } = this.categories.find(f => f.id == catId);
      this.current = id;
      this.title = title;
      this.limit = limit;
    }
  },

  // очистка памяти
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  }
};
</script>
