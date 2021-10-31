import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Config } from '../../service/Config';
import Icon from '../icon/Icon';

interface ISingleMenu {
  key: string;
  value: string;
  path: string;
  icon?: React.ReactNode;
}

interface ISubMenu {
  key: string;
  value: string;
  icon?: React.ReactNode;
  listChild: ISingleMenu[];
}

interface IGroupItem {
  key: string;
  title: string;
  listChild: ISingleMenu[];
}

interface IGroupMenu {
  key: string;
  value: string;
  icon?: React.ReactNode;
  listChild: IGroupItem[];
}

interface IDataMenu {
  type: 'SINGLE_MENU' | 'SUB_MENU' | 'GROUP_MENU';
  item: ISingleMenu | ISubMenu | IGroupMenu;
}

export const dataMenuAdmin: IDataMenu[] = [
  {
    type: 'SINGLE_MENU',
    item: {
      key: '001',
      path: Config.routerAdmin[0].path,
      value: 'Tổng Quan',
      icon: Icon.MENU_ICON.DASHBOARD,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '002',
      path: '',
      value: `Danh mục sản phẩm`,
      icon: Icon.MENU_ICON.CATE,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '004',
      path: '',
      value: 'Sản phẩm',
      icon: Icon.MENU_ICON.PRODUCT,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '005',
      path: '',
      value: 'Khách hàng',
      icon: Icon.MENU_ICON.CUSTOMER,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '006',
      path: '',
      value: 'Đơn hàng',
      icon: Icon.MENU_ICON.ORDER,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '007',
      path: '',
      value: 'Live stream',
      icon: Icon.MENU_ICON.LIVE_STREAM,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '008',
      path: '',
      value: 'Chat',
      icon: Icon.MENU_ICON.CHAT,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '009',
      path: '',
      value: 'Thêm thông báo',
      icon: Icon.MENU_ICON.NOTIFICATION,
    } as ISingleMenu,
  },
  {
    type: 'SUB_MENU',
    item: {
      key: '010',
      value: 'Báo cáo',
      icon: Icon.MENU_ICON.REPOST,
      listChild: [
        {
          key: '010_01',
          path: '',
          value: 'Báo cáo bán hàng',
        },
        {
          key: '010_02',
          path: '',
          value: 'Báo cáo live stream',
        },
      ],
    } as ISubMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '011',
      path: '',
      value: 'Tài khoản',
      icon: Icon.MENU_ICON.ACCOUNT,
    } as ISingleMenu,
  },
];

const dataMenuEnterPrise: IDataMenu[] = [
  {
    type: 'SINGLE_MENU',
    item: {
      key: '001',
      path: '',
      value: 'Tổng Quan',
      icon: Icon.MENU_ICON.DASHBOARD,
    } as ISingleMenu,
  },
];

const MenuComponent: React.FC<{ data: IDataMenu[] }> = ({ data }) => {
  const openKey = (dataMenu: IDataMenu[]): { openKey: string; key: string } => {
    const { pathname } = window.location;
    let result: { openKey: string; key: string } = { openKey: '', key: '' };

    dataMenu.forEach((value) => {
      const itemSingle = value.item as ISingleMenu;
      const itemSub = value.item as ISubMenu;
      const itemGroup = value.item as IGroupMenu;

      const getResult = (item: ISingleMenu): boolean => {
        if (item.path.split('?')[0] === pathname) {
          result.key = item.key;
          return true;
        }
        return false;
      };

      if (value.type === 'SINGLE_MENU') {
        if (getResult(itemSingle)) result.openKey = itemSingle.key;
      } else if (value.type === 'SUB_MENU') {
        itemSub.listChild.forEach((value1) => {
          if (getResult(value1)) result.openKey = itemSub.key;
        });
      } else {
        itemGroup.listChild.forEach((value1) => {
          let check: boolean = false;
          value1.listChild.forEach((value2) => {
            if (getResult(value2)) check = true;
          });
          if (check) result.openKey = itemGroup.key;
        });
      }
    });
    return result;
  };

  const renderMenuItem = (value: IDataMenu): React.ReactNode => {
    const itemSingle: ISingleMenu = value.item as ISingleMenu;
    const itemSubMenu: ISubMenu = value.item as ISubMenu;
    const itemGroup: IGroupMenu = value.item as IGroupMenu;

    const renderItemSingleMenu = (item: ISingleMenu): React.ReactNode => {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.value}</Link>
        </Menu.Item>
      );
    };

    if (value.type === 'SINGLE_MENU') return renderItemSingleMenu(itemSingle);
    else if (value.type === 'SUB_MENU')
      return (
        <Menu.SubMenu key={itemSubMenu.key} icon={itemSubMenu.icon} title={itemSubMenu.value}>
          {itemSubMenu.listChild.map((value1) => renderItemSingleMenu(value1))}
        </Menu.SubMenu>
      );
    else
      return (
        <Menu.SubMenu key={itemGroup.key} icon={itemGroup.icon} title={itemGroup.value}>
          {itemGroup.listChild.map((value1) => {
            return (
              <Menu.ItemGroup key={value1.key} title={value1.title}>
                {value1.listChild.map((value2) => renderItemSingleMenu(value2))}
              </Menu.ItemGroup>
            );
          })}
        </Menu.SubMenu>
      );
  };

  return (
    <div className={'menu'}>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={[openKey(data).key]}
        defaultOpenKeys={[openKey(data).openKey]}
      >
        {data.map((value) => renderMenuItem(value))}
      </Menu>
    </div>
  );
};

export default MenuComponent;
