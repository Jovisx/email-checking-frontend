import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'i18n';
import Dropdown from 'components/widgets/Dropdown';

const PaginationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 20px;

  .items_per_page {
    display: flex;
    align-items: center;
    margin-right: 30px;

    > p {
      margin-right: 13px;
    }

    .page_size_filter {
      width: 80px;

      >div {
        >div {
          background-color: unset;
        }
      }
    }
  }

  .pagination_wrapper {
    display: flex;

    > p {
      display: flex;
      min-width: 90px;
      align-items: center;
      margin-right: 16px;
    }

    .decrease_page, .increase_page {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      color: var(--color-red);
      cursor: pointer;
      user-select: none;

      &:hover {
        box-shadow: 0px 4px 8px rgba(79, 75, 108, 0.115093);
      }
    }

    .decrease_page {
      margin-right: 8px;
    }
  }
`;

const Pagination = ({ showPageSizeOptions, pageSizeOptions, defaultPageSize, pageSize, total, page, onChangePage, onShowSizeChange, ...props }) => {
  const { t } = useTranslation('language');
  const handlePageSizeChange = selectedOption => {
    onShowSizeChange(selectedOption.value);
    // onChangePage(1);
  };

  const onDecreasePage = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };
  const onIncreasePage = () => {
    if (page * pageSize < total) {
      onChangePage(page + 1);
    }
  };

  useEffect(() => {
    if (page > 1 && (page - 1) * pageSize + 1 > total) {
      onChangePage(1);
    }
  }, [page, pageSize, total]);

  useEffect(() => {
    onChangePage(1);
  }, []);

  return (
    <PaginationWrap {...props}>
      {showPageSizeOptions && (
        <div className="items_per_page">
          <p>{t('pagination.items_per_page')}</p>
          <Dropdown
            className="page_size_filter drop-up"
            options={pageSizeOptions}
            isSearchable={false}
            defaultValue={pageSize}
            placeholder={pageSize}
            getOptionValue={({ value }) => value}
            getOptionLabel={({ label }) => label}
            onChange={handlePageSizeChange}
            height={24}
            menuPlacement="top"
            indicatorColor="#FB3232"
          />
        </div>
      )}
      <div className="pagination_wrapper">
        <p>
          {
            total > 0
              ? `${(page - 1) * pageSize + 1} - ${page * pageSize < total ? page * pageSize : total} of ${total}`
              : '0 of 0'
          }
        </p>
        <div className="decrease_page" onClick={onDecreasePage}>
          <span>&lsaquo;</span>
        </div>
        <div className="increase_page" onClick={onIncreasePage}>
          <span>&rsaquo;</span>
        </div>
      </div>
    </PaginationWrap>
  );
};

Pagination.propTypes = {
  showPageSizeOptions: PropTypes.bool,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  total: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  onChangePage: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func,
};
Pagination.defaultProps = {
  showPageSizeOptions: true,
  defaultPageSize: 16,
  pageSize: 0,
  page: 1,
  total: 0,
  pageSizeOptions: [{ value: 10, label: 10 }],
  onShowSizeChange: () => {},
};

export default Pagination;
