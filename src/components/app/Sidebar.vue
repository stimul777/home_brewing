<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: localizeFilter("Sidebar_Bill"), url: "/", exact: true },
      { title: localizeFilter("Sidebar_History"), url: "/history" },
      { title: localizeFilter("Sidebar_Planing"), url: "/planning" },
      { title: localizeFilter("Sidebar_Record"), url: "/record" },
      { title: localizeFilter("Sidebar_Category"), url: "/categories" },
      { title: "крипта", url: "/cryptocurrency", exact: true }
    ]
  })
};
</script>
