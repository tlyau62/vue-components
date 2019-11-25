import Vue from 'vue';
import ContextMenu from './ContextMenu.vue';
import $ from 'jquery';

export default function (binding, configs, zIndex = 1000, menus = []) {
  const vContextMenu = Vue.extend(ContextMenu);
  const vInstance = new vContextMenu({
    parent: binding,
    propsData: {
      binding,
      items: configs.items,
      menus,
      zIndex
    }
  });

  menus.push(vInstance);

  $('body').append(vInstance.$mount().$el);

  return vInstance;
}