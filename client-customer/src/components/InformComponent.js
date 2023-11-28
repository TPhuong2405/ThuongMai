import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="border-bottom">
        
        {/* <div className="float-left">
          <Link to=''>Login</Link> | <Link to=''>Sign-up</Link> | <Link to=''>Active</Link>
          <Link to=''>Login</Link> | <Link to='/signup'>Sign-up</Link> | <Link to='/active'>Active</Link>
        </div> */}

        <div className="float-left">
          {this.context.token === '' ?
            <div><Link to='/login'>Đăng nhập</Link> | <Link to='/signup'>Đăng ký</Link> | <Link to='/active'>Kích hoạt</Link></div>
            :
            <div>Xin Chào <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link> | <Link to='/myprofile'>Thông tin của tôi</Link> | <Link to='/myorders'>Đơn đặt hàng của tôi</Link></div>
        }
        </div>

        <div className="float-right">
          <Link to='/mycart'>Giỏ hàng</Link> Có <b>{this.context.mycart.length}</b> Mục
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;

