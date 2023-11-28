import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><Link to='/admin/home'>TRANG CHỦ</Link></li>
            <li className="menu"><Link to='/admin/category'>DANH MỤC</Link></li>
            <li className="menu"><Link to='/admin/product'>SẢN PHẨM</Link></li>
            <li className="menu"><Link to='/admin/order'>ĐẶT HÀNG</Link></li>
            <li className="menu"><Link to='/admin/customer'>KHÁCH HÀNG</Link></li>
            <li className="menu"><Link to='/admin/notification'>THÔNG BÁO</Link></li> 
          </ul>
        </div>
        {/* tắt đèn */}
        <div style={{ display: "inline" }} class="form-switch">
          <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Sáng / Tối
        </div>
        <div></div>
        <div className="float-right">
          Hello <b>{this.context.username}</b> | 
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Đăng Xuất</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
  // event-handlers
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
}
export default Menu;