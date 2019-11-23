import $ from 'jquery';
import ContextMenu from './ContextMenu';

export default {
    bind(el, binding, vnode) {
        $(el).contextmenu(($evt) => {
            ContextMenu(vnode.context, binding.value).open($evt.originalEvent);

            $evt.preventDefault();
            $evt.stopPropagation();
        });
    },
    unbind(el) {
        $(el).off('contextmenu');
    }
}