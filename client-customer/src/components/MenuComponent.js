import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../App.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      notifications: [],
      txtKeyword: '',
      showNotifications: false,
      selectedNotification: null,
    };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><Link to='/'>TRANG CHỦ</Link></li>
            <li className="menu"><Link to='/gmap'>BẢN ĐỒ</Link></li>
            <li className="menu"><Link to='/Introduce'>GIỚI THIỆU</Link></li>
            {cates}
          </ul>
        </div>

        <div style={{ display: 'inline' }} className="form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => this.ckbChangeMode(e)}
          />
          &nbsp; Sáng / Tối
        </div>

        <div className="float-right">
          <form className="search">
            <input
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <input
              type="submit"
              value="SEARCH"
              onClick={(e) => this.btnSearchClick(e)}
            />
          </form>
        </div>

        <div className="float-clear" />

        <button class="thongbao" onClick={() => this.toggleNotifications()}>
        🔔 Thông Báo
        </button>

        {this.state.showNotifications && (
          <div className="notifications-container right-positioned">
            {this.state.notifications.map((item) => (
              <div key={item._id} className={'notification-item'}>
                <span onClick={() => this.selectNotification(item)}>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  apiGetNotification() {
    axios.get('/api/customer/notifications').then((res) => {
      const result = res.data;
      this.setState({ notifications: result });
    });
  }

  toggleNotifications() {
    // Toggle the state of showNotifications
    this.setState((prevState) => ({
      showNotifications: !prevState.showNotifications,
    }));

    // If notifications are shown, fetch them
    if (!this.state.showNotifications) {
      this.apiGetNotification();
    }
  }

  selectNotification(notification) {
    // Handle the selected notification as needed
    console.log('Selected Notification:', notification);
    // Optionally, you can set the selected notification in the state
    this.setState({ selectedNotification: notification });
  }
}

export default withRouter(Menu);
