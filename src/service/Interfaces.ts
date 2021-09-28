export interface IColumn {
  title: string | null;
  dataIndex: string;
  key: string;
  render: (value: any, row?: any, index?: any) => any;
  width?: number;
  align?: 'center' | 'left' | 'right';
}

export interface IMetaData {
  current: number;
  total: number;
  pageSize: number;
  showSizeChanger: boolean;
  onChange: (page: number) => any;
}
