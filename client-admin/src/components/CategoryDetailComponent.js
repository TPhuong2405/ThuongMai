import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../App.css'

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CHI TIẾT DANH MỤC</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {/* <input type="submit" value="ADD NEW" /> */} 
                  <input class="ctdanhmuc" type="submit" value="THÊM MỚI" onClick={(e) => this.btnAddClick(e)} />
                  <input class="ctdanhmuc" type="submit" value="CẬP NHẬT" onClick={(e) => this.btnUpdateClick(e)} />
                  <input class="ctdanhmuc" type="submit" value="XÓA" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÊM MỚI THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('XIN LỖI');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('CẬP NHẬT THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('XIN LỖI');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('BẠN CÓ CHẮC KHÔNG?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('XÓA THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('XIN LỖI');
      }
    });
  }
}
export default CategoryDetail;