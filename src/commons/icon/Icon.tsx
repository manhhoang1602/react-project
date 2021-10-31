import React from 'react';

class Icon {
  static COLLAPSED_MENU = <i className='fal fa-bars' />;
  static NOTIFICATION = <i className='fal fa-bell'/>;
  static MENU_ICON = {
    DASHBOARD: <i className="far fa-tachometer-alt" />,
    CATE: <i className="fas fa-bars" />,
    PRODUCT: <i className="fas fa-box-open" />,
    CUSTOMER: <i className="fas fa-users" />,
    ORDER: <i className="fas fa-cart-arrow-down" />,
    LIVE_STREAM: <i className="fas fa-video" />,
    CHAT: <i className="fas fa-comments" />,
    NOTIFICATION: <i className="fas fa-bell" />,
    REPOST: <i className="fas fa-chart-area" />,
    ACCOUNT: <i className="fas fa-user-circle" />,
  }
}

export default Icon;