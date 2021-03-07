<template>
  <div>
    <div class="page-title">
      <h3>{{ "Categories_categories" | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @createdEmit="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updatedSucess="updatedSucess"
        />
        <p v-else class="center">{{ "Categories_noCategories" | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: "categories",
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },

    updatedSucess(category) {
      const idx = this.categories.findIndex(f => f.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      // для перерисовки селекта при изменении названия(компонент заново будет рендериться)
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  }
};
</script>
