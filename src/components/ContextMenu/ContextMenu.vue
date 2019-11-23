<template>
  <div class="context-menu" tabindex="-1" :style="style" @blur="close()">
    <ul>
      <li
        v-for="item in items"
        :key="item.name"
        @click="alive && invoke($event, item)"
        @mouseover="alive && openSubMenu(item, $event)"
      >
        <span class="context-menu-icon" v-if="item.icon" v-html="item.icon"></span>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu";
import $ from "jquery";

export default {
  name: "context-menu",
  props: ["items", "zIndex", "menus", "binding"],
  data() {
    return {
      style: {
        display: "none",
        top: 0,
        left: 0,
        "z-index": this.zIndex
      },
      alive: true
    };
  },
  methods: {
    open($event) {
      this.style.top = $event.y + "px";
      this.style.left = $event.x + "px";
      this.style.display = "inline-block";
      this.$nextTick(() => {
        this.$el.focus();
        $(this.$el)
          .find("ul")
          .slideDown("fast");
      });
    },
    close() {
      const menus = this.menus;

      if (menus[menus.length - 1] !== this) {
        // delegate the close action to current focus menu
        return;
      }

      while (menus.length > 0) {
        menus.pop().$destroy();
      }
    },
    invoke($event, item) {
      item.action && item.action.apply(this.binding, $event);
      this.close();
    },
    openSubMenu(item, $event) {
      const menus = this.menus;

      if (
        item.subMenu &&
        menus.length > 0 &&
        menus[menus.length - 1].$props.items === item.subMenu.items
      ) {
        // current menu is created
        return;
      }

      while (menus.length > 0 && menus[menus.length - 1] !== this) {
        menus.pop().$destroy();
      }

      this.$el.focus();

      if (item.subMenu) {
        const pos = {};

        pos.x = this.$el.offsetLeft + this.$el.offsetWidth;
        pos.y = this.$el.offsetTop + $event.target.offsetTop;

        ContextMenu(this.binding, item.subMenu, this.zIndex + 1).open(pos);
      }
    }
  },
  beforeDestroy() {
    this.alive = false;
  },
  destroyed() {
    const $dom = $(this.$el);

    $dom.fadeOut("fast", () => $dom.remove());
  }
};
</script>

<style scoped>
.context-menu {
  position: fixed;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  color: #606060;
  font-size: 0.9rem;

  /* https://www.cssmatic.com/box-shadow */
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
}

.context-menu:focus {
  outline: none;
}

.context-menu ul {
  display: none;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.context-menu li {
  width: 250px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: whitesmoke;
}

.context-menu-icon {
  display: inline-block;
  width: 1.5rem;
}
</style>