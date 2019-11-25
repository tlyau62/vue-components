<template>
  <div id="app" class="container" @click="deactivate">
    <div class="table-responsive text-nowrap">
      <vuetable
        ref="vuetable"
        :fields="fields"
        :api-mode="false"
        :data="docs"
        :css="vueTableCss"
        :row-class="onRowClass"
        @vuetable:cell-clicked="activate"
        @vuetable:cell-rightclicked="onClick"
      ></vuetable>
    </div>
  </div>
</template>

<script>
import ContextMenu from "./components/ContextMenu";
import Vuetable from "vuetable-2";
import {
  VueTableCss,
  vueTableCtxMenu
} from "./components/VueTable/VueTableConfig.js";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      vueTableCss: VueTableCss.table,
      vueTableCtxMenu,
      message: "Hello Vue!",
      activeRow: -1,
      fields: [
        {
          name: "name",
          sortField: "name",
          titleClass: "w-100",
          dataClass: "w-100"
        },
        {
          name: "owner",
          sortField: "owner"
        },
        {
          name: "modified",
          sortField: "modified"
        },
        {
          name: "size",
          sortField: "size"
        }
      ],
      docs: [
        {
          name: "test.doc",
          owner: "a",
          modified: "10/19/2011",
          size: "1mb"
        },
        {
          name: "test2.doc",
          owner: "ab",
          modified: "10/19/2011",
          size: "1mb"
        },
        {
          name: "test3.doc",
          owner: "az",
          modified: "10/19/2011",
          size: "1mb"
        }
      ]
    };
  },
  methods: {
    onClick(vevt) {
      const { event, data } = vevt;

      event.preventDefault();
      event.stopPropagation();

      this.activate(vevt);
      ContextMenu(this, this.vueTableCtxMenu, data).open(event);
    },
    onRowClass(dataItem, index) {
      return this.activeRow === index ? "table-primary" : null;
    },
    activate(vevt) {
      vevt.event.stopPropagation();

      this.activeRow = vevt.index;
      this.$refs.vuetable.refresh();
    },
    deactivate() {
      this.activeRow = -1;
      this.$refs.vuetable.refresh();
    }
  }
};
</script>

<style>
/* https://chriscourses.com/blog/loading-fonts-webpack */
/* https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers */
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "~bootstrap/dist/css/bootstrap.min.css";

html,
body,
#app {
  height: 100%;
  margin: 0;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
}

.selected {
  color: blue;
}
</style>