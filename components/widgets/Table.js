import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'i18n';
import Checkbox from 'components/widgets/Checkbox';
import mediaQueryHeight from 'utils/matchQueryHeight';
import { useTheme } from 'utils/theme';

const TableWrapper = styled.div`
  width: 100%;

  .-header-only {
    .rt-tbody {
      display: none;
    }

    .rt-noData {
      display: none;
    }
  }

  .-body-only {
    .rt-thead {
      display: none;
    }
  }
`;

const NoDataWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 44px;

  img {
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 17px;
    color: var(--color-text-primary);
  }
`;

const CollapseButton = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 2px solid var(--color-bg-secondary);
  padding: 0;
  outline: none;
  opacity: ${props => (props.isCollapse ? '1' : '0.4')};

  i {
    display: block;
    color: ${props => (props.isCollapse ? 'var(--color-red)' : 'var(--color-text-main)')};
    font-size: 20px;
    transform: ${props => (props.isCollapse ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

/* eslint-disable react/prop-types */
const selectColumn = (selection, onSelection, onSelectAll, deleting) => ({
  className: 'selectbox',
  headerClassName: 'selectbox',
  Header: () => <Checkbox size="small" checked={selection.all} onChange={onSelectAll} />,
  Cell: ({ row }) => (
    <Checkbox
      size="small"
      checked={selection.includes(row._original[selection.keyField])}
      onChange={() => {
        if (selection.includes(row._original[selection.keyField])) {
          selection = selection.filter(id => row._original[selection.keyField] !== id);
        } else {
          selection.push(row._original[selection.keyField]);
        }
        onSelection([...selection]);
      }}
      disabled={deleting.includes(selection.keyField)}
    />
  ),
  sortable: false,
});
const collapseColumn = (collapsed, onCollapse, onRowCollapsed) => ({
  className: 'selectbox checkbox',
  headerClassName: 'selectbox checkbox',
  Header: () => <div style={{ width: 24 }} />,
  Cell: ({ row }) => (
    <CollapseButton
      className="btn-collapse"
      onClick={() => {
        if (collapsed.includes(row._original[collapsed.keyField])) {
          collapsed = collapsed.filter(id => row._original[collapsed.keyField] !== id);
        } else {
          collapsed.push(row._original[collapsed.keyField]);
          onRowCollapsed(row._original);
        }
        onCollapse([...collapsed]);
      }}
      isCollapse={collapsed.includes(row._original[collapsed.keyField])}
    >
      <i className="icon-triangle" />
    </CollapseButton>
  ),
  sortable: false,
});
/* eslint-enalbe react/prop-types */

function getMedia() {
  if (!window) return 'xl';
  if (window.innerWidth >= 1440) return 'xl';
  if (window.innerWidth >= 1024) return 'lg';
  if (window.innerWidth >= 576) return 'md';
  return 'sm';
}

function Table({
  columns,
  data,
  defaultPageSize,
  pagination,
  striped,
  keyField,
  highlight,
  trProps,
  selection,
  onSelection,
  deleting,
  collapsed,
  onCollapse,
  onRowCollapsed,
  onOverRow,
  onClickRow,
  style,
  height,
  className: clsName,
  reverseScroll,
  noDataImgSrc,
  noDataText,
  loading,
  ...props
}) {
  const { t } = useTranslation('language');
  const [media, setMedia] = useState('xl');
  useEffect(() => {
    const m = getMedia();
    if (m !== media) setMedia(getMedia());
  }, []);

  const [bodyRef, setBodyRef] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const handleSelectAll = () => onSelection(selection.length !== data.length ? data.map(({ [keyField]: id }) => id) : []);
  const getCols = () => {
    if (selection) {
      selection.all = ((data.length > 0) && (selection.length === data.length));
      selection.keyField = keyField;
    }
    if (collapsed) {
      collapsed.keyField = keyField;
    }
    const cols = selection ? [selectColumn(selection, onSelection, handleSelectAll, deleting), ...columns ] : [...columns];
    if (collapsed) cols.push(collapseColumn(collapsed, onCollapse, onRowCollapsed));
    return cols.map(({ isMain, className, minWidth = 80, ...col }) => ({ ...col, resizable: false, className: isMain ? `${className || ''} -main` : className, minWidth }));
  };

  const classes = {
    [clsName]: true,
    selectable: selection || collapsed,
    '-striped': striped,
    '-highlight': highlight,
    '-noData': data.length === 0,
  };
  const className = Object.keys(classes)
    .filter(k => classes[k])
    .join(' ');

  const bodyOnly = clsName.includes('-body-only');
  const tableHeight = typeof height === 'number' ? height - (bodyOnly ? 0 : 40) : {};
  if (typeof height === 'object') {
    Object.keys(height).forEach(key => {
      tableHeight[key] = height[key] - (bodyOnly ? 0 : 40);
    });
  }

  if (reverseScroll && !scrolled && bodyRef) {
    bodyRef.scrollTop = bodyRef.childNodes[0].clientHeight - bodyRef.clientHeight;
    setScrolled(true);
  }

  const bodyHeight = typeof height === 'number' ? tableHeight : mediaQueryHeight(tableHeight, media);
  const pageSize = defaultPageSize || Math.floor(bodyHeight / 30);

  return (
    <PerfectScrollbar>
      {loading && <div className="loading">Loading...</div>}
      <TableWrapper
        style={style}
        onMouseOver={e => {
          let element = e.target;
          while (element && !(element.className || '').includes('rt-tr-group')) {
            element = element.parentElement;
          }
          if (element && element.children && element.children[0] && element.children[0].dataset.key) {
            onOverRow(Number(element.children[0].dataset.key));
          } else {
            onOverRow(-1);
          }
        }}
        onFocus={() => { }}
        onClick={onClickRow}
      >
        {!clsName.includes('-body-only') && (
          <ReactTable
            columns={getCols()}
            className={`${className} -header-only`}
            manual
            {...props}
          />
        )}
        {(!data || data.length === 0)
          ? (
            <NoDataWrapper style={{ height: mediaQueryHeight(tableHeight, media) }}>
              <img src={`/static/img/icons/no_data_${noDataImgSrc || 1}_${useTheme().name}.svg`} alt="no-data" />
              <p>{noDataText || t('no_data.default')}</p>
            </NoDataWrapper>
          ) : (
            <PerfectScrollbar
              options={{
                useBothWheelAxes: false,
                suppressScrollX: true,
              }}
              style={{ height: bodyHeight }}
              containerRef={setBodyRef}
            >
              <ReactTable
                className={`${className} -body-only`}
                data={data}
                columns={getCols()}
                minRows={pageSize}
                manual={!pagination}
                getTrProps={(state, row) => ({
                  className: row && selection && selection.includes(row.original[keyField]) && '-active',
                  ...trProps(state, row),
                })}
                {...props}
              />
            </PerfectScrollbar>
          )}
      </TableWrapper>
    </PerfectScrollbar>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  className: PropTypes.string,
  defaultPageSize: PropTypes.number,
  pagination: PropTypes.bool,
  trProps: PropTypes.func,
  selection: PropTypes.array,
  onSelection: PropTypes.func,
  collapsed: PropTypes.array,
  deleting: PropTypes.array,
  onCollapse: PropTypes.func,
  onRowCollapsed: PropTypes.func,
  onOverRow: PropTypes.func,
  onClickRow: PropTypes.func,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
  highlight: PropTypes.bool,
  keyField: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  reverseScroll: PropTypes.bool,
  noDataText: PropTypes.string,
  noDataImgSrc: PropTypes.number,
};

Table.defaultProps = {
  data: [],
  className: '',
  defaultPageSize: 0,
  pagination: false,
  trProps: () => { },
  selection: null,
  onSelection: () => { },
  deleting: [],
  collapsed: null,
  onCollapse: () => { },
  onRowCollapsed: () => { },
  onOverRow: () => { },
  onClickRow: () => { },
  loading: false,
  striped: false,
  highlight: true,
  keyField: 'id',
  style: {},
  height: 304,
  reverseScroll: false,
  noDataText: null,
  noDataImgSrc: 1,
};

export default Table;
