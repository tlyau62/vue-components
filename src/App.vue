<template>
  <div id="app" @click.right.prevent.stop="open">
    {{message}}
    <i class="fas fa-user"></i>
    <i class="fab fa-accessible-icon"></i>
  </div>
</template>

<script>
import ContextMenu from "./components/ContextMenu";

export default {
  data() {
    return {
      message: "Hello Vue!"
    };
  },
  methods: {
    open($event) {
      ContextMenu(this, {
        items: [
          {
            name: "action1",
            action() {
              console.log("test");
            }
          },
          {
            name: "action2",
            action() {
              this.message += "hi";
            }
          },
          {
            name: "actions setz",
            subItems: {
              items: [
                {
                  name: "subaction2",
                  action() {
                    this.message += "hello";
                  },
                  subItems: {
                    items: [
                      {
                        name: "subsubaction",
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
            name: "actions set 2",
            subItems: {
              items: [
                {
                  name: "subaction3",
                  action() {
                    this.message += "hello";
                  }
                }
              ]
            }
          }
        ]
      }).open($event);
    }
  }
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