import Sortable from 'sortablejs';

export function saveTemplateSizeColumn() {
  const tables = document.getElementsByTagName('table');

  Array.from(tables).forEach((table) => {
    resizableGrid(table);
  });

  function resizableGrid(table) {
    const row = table.querySelector('tr');
    const cols = row ? Array.from(row.children) : [];

    cols.forEach((col, i) => {
      const orderName = col.getAttribute('data-order');
      let columnValue;

      if (i === 0 || i === cols.length - 1) {
        columnValue = '100px';
      } else {
        columnValue = col.style.width;
      }

      localStorage.setItem(`size_column_${orderName}`, JSON.stringify(columnValue));
    });
  }
}

export function getDataTableHTML(thisCopy) {
  console.log('render');
  let tables = document.getElementsByTagName('table');

  for (let i = 0; i < tables.length; i++) {
    resizableGrid(tables[i]);
  }

  function resizableGrid(table) {
    let row = table.getElementsByTagName('tr')[0],
      cols = row ? row.children : undefined;
    if (!cols) return;

    [...row.children].forEach((el, i) => {
      el.style.borderRight = '1px solid rgb(0, 0, 0, 0.12)';

      el.style.borderLeft = 'none';
      if (i === [...row.children].length - 1) {
        el.style.borderRight = 'none';
        el.style.pointerEvents = 'none';
      }
    });

    table.style.overflow = 'hidden';

    let tableHeight = 54;

    for (let i = 0; i < cols.length; i++) {
      let div = createDiv(tableHeight);
      cols[i].appendChild(div);
      cols[i].style.position = 'relative';
      setListeners(div, i);
    }

    function setListeners(div, i) {
      if (cols.length - 2 === i) div.style.pointerEvents = 'none';

      let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

      div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement;
        nxtCol = curCol.nextElementSibling;
        pageX = e.pageX;

        let padding = paddingDiff(curCol);

        curColWidth = curCol.offsetWidth - padding;
        if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
      });

      div.addEventListener('mouseover', function (e) {
        e.target.style.borderRight = '2px solid grey';
      });

      div.addEventListener('mouseout', function (e) {
        e.target.style.borderRight = '';
      });

      row.addEventListener('mousemove', function (e) {
        console.log('move');
        if (curCol) {
          thisCopy.saveChange = 'change';
          let diffX = e.pageX - pageX;
          if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + 'px';
          curCol.style.width = curColWidth + diffX + 'px';
        }
      });

      document.addEventListener('mouseup', function () {
        curCol = undefined;
        nxtCol = undefined;
        pageX = undefined;
        nxtColWidth = undefined;
        curColWidth = undefined;
      });
    }

    function createDiv(height) {
      let div = document.createElement('div');
      div.style.top = 0;
      div.style.right = 0;
      div.style.width = '5px';
      div.style.position = 'absolute';
      div.style.cursor = 'col-resize';
      div.style.userSelect = 'none';
      div.style.height = height + 'px';
      return div;
    }

    function paddingDiff(col) {
      if (getStyleVal(col, 'box-sizing') == 'border-box') {
        return 0;
      }

      let padLeft = getStyleVal(col, 'padding-left');
      let padRight = getStyleVal(col, 'padding-right');
      return parseInt(padLeft) + parseInt(padRight);
    }

    function getStyleVal(elm, css) {
      return window.getComputedStyle(elm, null).getPropertyValue(css);
    }
  }
}

export function changeSortHeaders(element, _self, extraSort) {
  this.$nextTick(() => {
    Sortable.create(element, {
      handle: '.headerHandle',
      onEnd({ newIndex, oldIndex }) {
        const headerSelected = _self.showUpdateHeaders.splice(oldIndex, 1)[0];
        _self.showUpdateHeaders.splice(newIndex, 0, headerSelected);
        if (!extraSort) _self.saveChange = 'change';
      },
      ghostClass: 'sortable-ghost_header',
    });
  });
}

export function changeSortColumns(table, _self, saveChangeActive) {
  this.$nextTick(() => {
    Sortable.create(table, {
      handle: '.rowHandle',
      onEnd({ newIndex, oldIndex }) {
        const rowSelected = _self.columns.splice(oldIndex, 1)[0];
        _self.columns.splice(newIndex, 0, rowSelected);
        if (_self.saveChange !== undefined) _self.saveChange = 'change';
        saveChangeActive && saveChangeActive();
      },
      ghostClass: 'sortable-ghost',
    });
  });
}
