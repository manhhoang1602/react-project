import { Spin } from 'antd';
import React, { Component, CSSProperties } from 'react';
import './style.css';

interface IProps {
  style?: CSSProperties;
}

interface IState {}

class LoaingComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={'loading-component'} style={{ ...this.props.style }}>
        <Spin />
      </div>
    );
  }
}

export default LoaingComponent;
