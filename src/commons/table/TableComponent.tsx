import React, { useEffect, useRef, useState } from 'react';
import { Pagination, Table } from 'antd';
import { ExpandedRowRender } from 'rc-table/lib/interface';
import { IColumn } from '../../service/Interfaces';
import { Config } from '../../service/Config';

interface IPagination {
  current: number;
  pageSize?: number;
  total: number;
  onChangePagination: (page: number) => any;
}

interface ITableComponent {
  columns?: IColumn[];
  dataSource?: any[];
  pagination?: IPagination;
  loading?: boolean;
  onExpand?: (expanded: boolean, record: any) => any;
  expandedRowRender?: ExpandedRowRender<any>;
}

const TableComponent: React.FC<ITableComponent> = ({
  columns,
  dataSource,
  pagination,
  expandedRowRender,
  loading,
  onExpand,
  children,
}) => {
  const [key, setKey] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const activeRow = (key: string, color: string = '#f6f9ff') => {
    if (tableRef.current) {
      let trElement: any = tableRef.current.getElementsByTagName('tr');
      if (trElement && trElement.length >= 0) {
        for (let i = 0; i < trElement.length; i++) {
          if (trElement[i].hasAttribute('data-row-key')) {
            trElement[i].style.background = 'white';
            if (trElement[i].getAttribute('data-row-key') === key) {
              trElement[i].style.background = color;
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    activeRow(key.toString());
  }, [key]);

  return (
    <div className={'table-component'} ref={tableRef}>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={expandedRowRender}
        bordered
        expandedRowKeys={key}
        loading={loading}
        pagination={false}
        onExpand={(expanded: boolean, record: any) => {
          onExpand && onExpand(expanded, record);
          if (record.key !== key[0]) {
            setKey([record.key]);
          } else {
            setKey([]);
          }
        }}
        expandRowByClick={true}
      />

      {pagination && (
        <div className={'flex-end mt-16'}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize ? pagination.pageSize : Config.limit}
            total={pagination.total}
            showSizeChanger={false}
            onChange={(page) => {
              pagination!.onChangePagination(page);
              window.scroll({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TableComponent;
