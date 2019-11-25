export const VueTableCss = {
  table: {
    tableWrapper: '',
    tableHeaderClass: 'mb-0',
    tableBodyClass: 'mb-0',
    tableClass: 'table',
    loadingClass: 'loading',
    ascendingIcon: 'fa fa-chevron-up',
    descendingIcon: 'fa fa-chevron-down',
    ascendingClass: 'sorted-asc',
    descendingClass: 'sorted-desc',
    sortableIcon: 'fa fa-sort',
    detailRowClass: 'vuetable-detail-row',
    handleIcon: 'fa fa-bars text-secondary',
    renderIcon(classes, options) {
      return `<i class="${classes.join(' ')}"></span>`
    }
  },
  pagination: {
    wrapperClass: 'pagination float-right',
    activeClass: 'active',
    disabledClass: 'disabled',
    pageClass: 'page-item',
    linkClass: 'page-link',
    paginationClass: 'pagination',
    paginationInfoClass: 'float-left',
    dropdownClass: 'form-control',
    icons: {
      first: 'fa fa-chevron-left',
      prev: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      last: 'fa fa-chevron-right',
    }
  }
}

export const vueTableCtxMenu = {
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