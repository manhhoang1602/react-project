import React from 'react';
import { Card, Col, Row } from 'antd';
import RangePickerComponent from '../../commons/range-picker/RangePickerComponent';
import UploadFileComponent from '../../commons/upload/UploadFileComponent';
import { Notification } from '../../commons/notification/Notification';
import ExportCsv, { dataExport } from '../../commons/export-excel/ExportCSV';
import TableComponent from '../../commons/table/TableComponent';
import LineChart, { dataLineChart } from '../../commons/chart/LineChart';
import BarChart, { dataBarChart } from '../../commons/chart/BarChart';
import DoughnutAndPieChart from '../../commons/chart/DoughnutAndPieChart';

const Dashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col md={6}>
          <Card title={'Range picker component'} bordered={false}>
            <RangePickerComponent />
          </Card>
        </Col>
        <Col md={6}>
          <Card title={'Upload component'} bordered={false}>
            <UploadFileComponent
              type={'picture-card'}
              limit={1}
              name={'image'}
              path={'http://apidev.tpmart.winds.vn/api/v1/files/uploadFile/1'}
              size={3}
              isDisplayImgError={true}
              logger={(data) => {}}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card title={'Notification component'} bordered={false}>
            <button onClick={() => Notification.PushNotification('SUCCESS', 'Test push notyfication')}>
              Push Notification
            </button>
            <button onClick={() => Notification.PushMassage('SUCCESS', 'Test push notyfication')}>Push Message</button>
          </Card>
        </Col>
        <Col md={6}>
          <Card title={'Export excel'} bordered={false}>
            <ExportCsv
              onClick={(fn) => fn()}
              sheetName={['test']}
              sheets={{ test: ExportCsv.getSheets(dataExport) }}
              fileName={'test'}
            >
              Export
            </ExportCsv>
          </Card>
        </Col>
        <Col md={24}>
          <Card title={'Table component'} bordered={false}>
            <TableComponent />
          </Card>
        </Col>
        <Col md={24}>
          <Card title={'Line chart component'} bordered={false}>
            <LineChart data={dataLineChart} />
          </Card>
        </Col>
        <Col md={24}>
          <Card title={'Bar chart component(Vertical)'} bordered={false}>
            <BarChart data={dataBarChart} type={'Vertical'} />
          </Card>
        </Col>
        <Col md={24}>
          <Card title={'Bar chart component(Horizontal)'} bordered={false}>
            <BarChart data={dataBarChart} type={'Horizontal'} />
          </Card>
        </Col>
        <Col md={24}>
          <Card title={'Doughnut chart component(Horizontal)'} bordered={false}>
            <DoughnutAndPieChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
