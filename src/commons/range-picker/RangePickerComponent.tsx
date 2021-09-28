import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

interface IProps {
  placeholder?: [string, string];
  format?: [string, string];
  inputReadOnly?: boolean;
  onCalendarChange?: (date: any, formatString: [string, string]) => any;
}

interface IState {}

class RangePickerComponent extends Component<IProps, IState> {
  static placeholder: [string, string] = ['Từ ngày', 'Tới ngày'];
  static formatDate: [string, string] = ['DD/MM/YYYY', 'DD/MM/YYYY'];
  static formatTime: [string, string] = ['hh:mm DD/MM/YYYY', 'hh:mm DD/MM/YYYY'];

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  static disabledDate(current: any) {
    return current && current > moment().endOf('day');
  }

  render() {
    return (
      <DatePicker.RangePicker
        placeholder={RangePickerComponent.placeholder}
        format={RangePickerComponent.formatDate}
        disabledDate={RangePickerComponent.disabledDate}
        inputReadOnly={true}
        onCalendarChange={this.props.onCalendarChange}
      />
    );
  }
}

export default RangePickerComponent;
