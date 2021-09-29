import React, { Component } from 'react';
import styled from 'styled-components';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface IProps {
  sheetName: string[];
  sheets: { [key: string]: any };
  fileName: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (fn: Function) => any;
  loading?: boolean;
}

interface IState {}

export const dataExport = [{ col1: 'value1', col2: 'value2' }];

class ExportCsv extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.exportToCSV = this.exportToCSV.bind(this);
  }

  private fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private fileExtension = '.xlsx';

  public static getSheets(data: any[]): any {
    return XLSX.utils.json_to_sheet(data);
  }

  private async exportToCSV() {
    const wb: any = {
      title: 'hello',
      Sheets: this.props.sheets,
      SheetNames: this.props.sheetName,
    };

    console.log(wb);

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: this.fileType });
    FileSaver.saveAs(data, this.props.fileName + this.fileExtension);
  }

  render() {
    return (
      <Style
        style={{ ...this.props.style }}
        className={this.props.className}
        onClick={() => (this.props.onClick ? this.props.onClick(this.exportToCSV) : this.exportToCSV())}
      >
        {this.props.loading && <i className="fas fa-spinner fa-pulse" />}
        <span>{this.props.children}</span>
      </Style>
    );
  }
}

const Style = styled.div`
  background-color: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 28px;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  i {
    margin-right: 8px;
  }
`;

export default ExportCsv;
