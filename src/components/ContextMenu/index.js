import Vue from 'vue';
import ContextMenu from './ContextMenu.vue';
import $ from 'jquery';

/**
 * 
 * @param {*} binding binding for action
 * @param {*} configs context menu config
 * @param {*} selected current selected item
 * @param {*} zIndex default zindex
 * @param {*} menus array for holding the context menu components
 */
export default function (binding, configs, selected, zIndex = 1000, menus = []) {
  const vContextMenu = Vue.extend(ContextMenu);
  const vInstance = new vContextMenu({
    parent: binding,
    propsData: {
      binding,
      items: configs.items,
      menus,
      zIndex,
      selected
    }
  });

  menus.push(vInstance);

  $('body').append(vInstance.$mount().$el);

  return vInstance;
}