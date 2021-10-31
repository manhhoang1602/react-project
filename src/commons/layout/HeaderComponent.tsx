import React from 'react';
import { Layout } from 'antd';
import Icon from '../icon/Icon';

const { Header } = Layout;

interface IHeaderComponent {
  toggle: () => any;
}

export const HeaderComponent: React.FC<IHeaderComponent> = ({ toggle }) => {
  return (
    <Header className='site-layout-background'>
      <div className={'wrapper-content-header'}>
        <BrandComponent />
        <OptionTopComponent onToggle={() => toggle()} />
      </div>
    </Header>
  );
};

const BrandComponent: React.FC = () => {
  return (
    <div className={'brand-component'}>
      Hoang DEV
    </div>
  );
};

const OptionTopComponent: React.FC<{ onToggle: () => any }> = ({ onToggle }) => {
  return (
    <div className={'option-top-component'}>
      <div onClick={() => onToggle()}>
        {Icon.COLLAPSED_MENU}
      </div>
      <div>
        {Icon.NOTIFICATION}
      </div>
    </div>
  );
};