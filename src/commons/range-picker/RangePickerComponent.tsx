import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

interface IProps {
  placeholder?: [string, string];
  format?: [string, string] | ['HH:mm DD/MM/YYYY', 'HH:mm DD/MM/YYYY'];
  inputReadOnly?: boolean;
  onCalendarChange?: (date: any, formatString: [string, string]) => any;
  disable?: 'FEATURE' | 'PAST' | 'DEFAULT'
  showTime?: boolean
  autoFocus?: boolean
}

interface IState {
}

class RangePickerComponent extends Component<IProps, IState> {
  static placeholder: [string, string] = ['Từ ngày', 'Tới ngày'];
  static formatDate: [string, string] = ['DD/MM/YYYY', 'DD/MM/YYYY'];
  static formatTime: [string, string] = ['DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm:ss'];

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  static disabledDateFeature(current: any) {
    return current && current > moment().endOf('day');
  }

  static disableDatePast(current: any) {
    return current && current < moment().endOf('day');
  }

  render() {
    return (
      <DatePicker.RangePicker
        placeholder={RangePickerComponent.placeholder}
        format={this.props.showTime ? undefined : RangePickerComponent.formatDate}
        disabledDate={current => this.getType(current, this.props.disable)}
        inputReadOnly={true}
        onCalendarChange={this.props.onCalendarChange}
        allowClear={true}
        showTime={this.props.showTime}
        showNow={true}
        autoFocus={this.props.autoFocus}
        suffixIcon={<i className='fal fa-calendar-alt' />}
      />
    );
  }

  private getType = (_current: any, _disable?: 'FEATURE' | 'PAST' | 'DEFAULT') => {
    if (_disable === undefined || _disable === 'DEFAULT') return undefined;
    else if (_disable === 'PAST') return RangePickerComponent.disableDatePast(_current);
    else if (_disable === 'FEATURE') return RangePickerComponent.disabledDateFeature(_current);
  };
}

export default RangePickerComponent;
