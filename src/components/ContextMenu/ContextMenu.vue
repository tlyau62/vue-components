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
        <span class="context-menu-text">{{item.name}}</span>
        <span class="context-menu-detail" v-if="item.subMenu">
          <i class="fas fa-chevron-right"></i>
        </span>
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

      this.$nextTick(() => this.focus());
    },
    close() {
      const menus = this.menus;

      if (!this.isFocused()) {
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
    isFocused() {
      const menus = this.menus;

      return menus.length > 0 && menus[menus.length - 1] === this;
    },
    focus() {
      const menus = this.menus;

      while (!this.isFocused()) {
        menus.pop().$destroy();
      }

      this.$el.focus();

      $(this.$el)
        .find("ul")
        .slideDown("fast");
    },
    openSubMenu(item, event) {
      const menus = this.menus;

      if (
        item.subMenu &&
        menus.length > 0 &&
        menus[menus.length - 1].$props.items === item.subMenu.items
      ) {
        // current menu is created
        return;
      }

      this.focus();

      if (item.subMenu) {
        const pos = {};

        pos.x = this.$el.offsetLeft + this.$el.offsetWidth;
        pos.y = this.$el.offsetTop + event.target.offsetTop;

        ContextMenu(
          this.binding,
          item.subMenu,
          this.menus,
          this.zIndex + 1
        ).open(pos);
      }
    }
  },
  destroyed() {
    const $dom = $(this.$el);

    // In 2.x we no longer remove the DOM listeners when destroying vms, since all supported browsers actually can correctly garbage-collect them.
    // see also: https://github.com/vuejs/vue/issues/5187
    this.alive = false;
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
  width: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.context-menu-text {
  margin-left: 1rem;
}

.context-menu-detail {
  float: right;
}
</style>