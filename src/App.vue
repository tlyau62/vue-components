<template>
  <div id="app" class="container">
    <vuetable
      ref="vuetable"
      :fields="['name', 'desc']"
      :api-mode="false"
      :data="docs"
      @vuetable:cell-rightclicked="onClick"
    ></vuetable>
  </div>
</template>

<script>
import ContextMenu from "./components/ContextMenu";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      message: "Hello Vue!",
      docs: [
        {
          name: "test.doc",
          desc: "test file"
        },
        {
          name: "test2.doc",
          desc: "test file 2"
        },
        {
          name: "test3.doc",
          desc: "test file 3"
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

      ContextMenu(this, this.ctxMenuConfig, data).open(event);
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
</style>