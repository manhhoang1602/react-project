import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

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

export const pathMenu = () => {
  return {
    home: '/',
    productCate: '/',
    product: '/',
    customer: '/',
    order: '/',
    liveStream: '/',
    chat: '/',
    notification: '/',
    reportSale: '/',
    reportLiveStream: '/',
    account: '/',
  };
};

const dataMenu: IDataMenu[] = [
  {
    type: 'SINGLE_MENU',
    item: {
      key: '001',
      path: pathMenu().home,
      value: 'Tổng Quan',
      icon: <i className="far fa-tachometer-alt" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '002',
      path: pathMenu().productCate,
      value: `Danh mục sản phẩm`,
      icon: <i className="fas fa-bars" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '004',
      path: pathMenu().product,
      value: 'Sản phẩm',
      icon: <i className="fas fa-box-open" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '005',
      path: pathMenu().customer,
      value: 'Khách hàng',
      icon: <i className="fas fa-users" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '006',
      path: pathMenu().order,
      value: 'Đơn hàng',
      icon: <i className="fas fa-cart-arrow-down" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '007',
      path: pathMenu().liveStream,
      value: 'Live stream',
      icon: <i className="fas fa-video" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '008',
      path: pathMenu().chat,
      value: 'Chat',
      icon: <i className="fas fa-comments" />,
    } as ISingleMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '009',
      path: pathMenu().notification,
      value: 'Thêm thông báo',
      icon: <i className="fas fa-bell" />,
    } as ISingleMenu,
  },
  {
    type: 'SUB_MENU',
    item: {
      key: '010',
      value: 'Báo cáo',
      icon: <i className="fas fa-chart-area" />,
      listChild: [
        {
          key: '010_01',
          path: pathMenu().reportSale,
          value: 'Báo cáo bán hàng',
        },
        {
          key: '010_02',
          path: pathMenu().reportLiveStream,
          value: 'Báo cáo live stream',
        },
      ],
    } as ISubMenu,
  },
  {
    type: 'SINGLE_MENU',
    item: {
      key: '011',
      path: pathMenu().account,
      value: 'Tài khoản',
      icon: <i className="fas fa-user-circle" />,
    } as ISingleMenu,
  },
];

const MenuComponent: React.FC<any> = () => {
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
        theme="light"
        mode="inline"
        defaultSelectedKeys={[openKey(dataMenu).key]}
        defaultOpenKeys={[openKey(dataMenu).openKey]}
      >
        {dataMenu.map((value) => renderMenuItem(value))}
      </Menu>
    </div>
  );
};

export default MenuComponent;
