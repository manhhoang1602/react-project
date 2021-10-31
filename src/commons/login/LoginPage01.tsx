import React from 'react';
import './LoginPage01.scss';

const LoginPage01 = () => {
  return (
    <div className={'LoginPage01'}>
      <div className={'LoginPage01__form'}>
        <div className={'LoginPage01__form__wrapper'}>

          <div className={'LoginPage01__form__wrapper__logo'}>
            <div>
              <i className='fas fa-mountains' />
            </div>
          </div>

          <input type={'text'} placeholder={'Tài khoản'} style={{backgroundColor: 'transparent'}} />
          <input type={'password'} placeholder={'Mật khẩu'} />

          <span className={'LoginPage01__form__wrapper__body'}>

          </span>

        </div>
      </div>
    </div>
  );
};

export default LoginPage01;