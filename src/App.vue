<template>
  <!-- <div id="app" @click.right.prevent.stop="open"> -->
  <div id="app" v-context-menu="ctxMenuConfig">{{message}}</div>
</template>

<script>
import ContextMenu from "./components/ContextMenu";

export default {
  directives: { ContextMenu },
  data() {
    return {
      message: "Hello Vue!",
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
            name: "Other actions"
          }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style>
/* https://chriscourses.com/blog/loading-fonts-webpack */
/* https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers */
@import "~@fortawesome/fontawesome-free/css/all.css";

html,
body,
#app {
  height: 100%;
  margin: 0;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
}
</style>