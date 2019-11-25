<template>
  <div id="app" class="container">
    <vuetable
      ref="vuetable"
      :fields="fields"
      :api-mode="false"
      :data="docs"
      :css="vueTableCss.table"
      :row-class="onRowClass"
      @vuetable:cell-clicked="activate"
      @vuetable:cell-rightclicked="onClick"
    ></vuetable>
  </div>
</template>

<script>
import ContextMenu from "./components/ContextMenu";
import Vuetable from "vuetable-2";
import VueTableCss from "./components/VueTable/VueTableCss.js";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      vueTableCss: VueTableCss,
      message: "Hello Vue!",
      activeRow: -1,
      fields: [
        {
          name: "name",
          sortField: "name"
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
      ],
      ctxMenuConfig: {
        items: [
          {
            name: "New Folder",
            icon: '<i class="fas fa-folder"></i>',
            action() {
              console.log("test");
            }
          },
          {
            spliter: true
          },
          {
            name: "Upload Files",
            icon: '<i class="fas fa-file-medical"></i>',
            action() {
              this.message += "hi";
            }
          },
          {
            name: "Upload Folder",
            icon: '<i class="fas fa-folder-plus"></i>',
            action() {
              this.message += "hi";
            }
          },
          {
            spliter: true
          },
          {
            name: "Workflow",
            icon: '<i class="fas fa-code-branch"></i>',
            subMenu: {
              items: [
                {
                  name: "Workflow 1",
                  icon: '<i class="fas fa-code-branch"></i>',
                  action() {
                    this.message += "hello";
                  }
                },
                {
                  name: "Workflow 2",
                  icon: '<i class="fas fa-code-branch"></i>',
                  action() {
                    this.message += "hello";
                  }
                },
                {
                  name: "Ultra Workflow",
                  icon: '<i class="fas fa-code-branch"></i>',
                  subMenu: {
                    items: [
                      {
                        name: "Ultra Workflow EX 1",
                        icon: '<i class="fas fa-code-branch"></i>',
                        action() {
                          this.message += "zzz";
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            name: "Other actions",
            subMenu: {
              items: [
                {
                  name: "Test",
                  action(arg) {
                    console.log(arg);
                    this.message += "zzz";
                  }
                }
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    onClick(vevt) {
      const { event, data } = vevt;

      event.preventDefault();
      event.stopPropagation();

      this.activate(vevt);
      ContextMenu(this, this.ctxMenuConfig, data).open(event);
    },
    onRowClass(dataItem, index) {
      return this.activeRow === index ? "table-primary" : null;
    },
    activate(vevt) {
      this.activeRow = vevt.index;
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