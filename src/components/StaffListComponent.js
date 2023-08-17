import React, { Component, useCallback, useState } from 'react';
import { Card, CardImg, Label, Modal, ModalBody, ModalHeader, Col, Row, Button, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import StaffDetail from './StaffDetailComponent';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from "react-animation-components";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validScale = (val) => /^[0-9]+\.[0-9]+$/i.test(val);

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.searchName = this.searchName.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  // lọc input value nhận cả chữ hoa lẫn thường 
  searchName(value) {
    const xName = value.name;
    const result = this.props.staffs.staffs.filter((x) =>
      x.name.toLowerCase().match(xName.toLowerCase())
    );
    this.setState({
      staffs: { ...this.state.staffs, ...{ staffs: result }},
    });
  }
  // thêm nhân viên mới vào
  handelSubmit(value) {
    const newStaff = {
      name: value.fullname,
      doB: value.doB,
      salaryScale: +value.salaryScale,
      startDate: value.startDate,
      departmentId: value.department,
      annualLeave: +value.annualLeave,
      overTime: +value.overTime,
      image: '/asset/images/alberto.png',
    };
    this.props.postStaff(newStaff);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    alert("Đã thêm thành công nhân viên " + newStaff.name + "!");
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    const RenderStaff = ({ item }) => {
      return (
        <FadeTransform in>
        <Card>
          <Link to={`/menu/${item.id}`}>
            <CardImg width="100%" src={item.image} alt={item.name} />
            <CardTitle className="text-center text-dark">{item.name}</CardTitle>
          </Link>
        </Card>
        </FadeTransform>
      )
    }
    console.log(this.state.staffs)

    const menu = this.state.staffs.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-lg-2 col-md-4 col-sm-2">
          <RenderStaff item={staff} />
        </div>
      );
    });
    if (this.state.staffs.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if(this.state.staffs.errMess){
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{this.state.staffs.errMess}</h4>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <div className="row mt-5">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Staffs List</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12 text-white">
              <h3>Danh sách nhân viên</h3>
              <Button color="dark" onClick={this.toggleModal}>
                <span className="fa fa-plus-square"> Thêm nhân viên</span>
              </Button>
              <hr />
            </div>
          </div>
          {/* form tìm kiếm nhân viên */}
          <LocalForm onSubmit={this.searchName} initialState={{ name: '' }}>
            <Row className="mb-3">
              <Col md={3}>
                <Control.text
                  model=".name"
                  className="form-control"
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Nhập tên nhân viên cần tìm"
                />
              </Col>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="ml-1"
              >
                <span className="fa fa-search"></span>
              </Button>
            </Row>
          </LocalForm>
          {/*form thêm nhân vien mới*/}
          <Modal isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
            className="col-10">
            <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
            <ModalBody>
              <div className="row row-content">
                <div className="col-12 text-content">
                  <h3> Vui lòng điền vào Form sau</h3>
                </div>
                <div className="col-12">
                  <LocalForm onSubmit={(value) => this.handelSubmit(value)}>
                    <Row className="form-group">
                      <Label htmlFor="fullname" md={3}>
                        Họ Tên
                      </Label>
                      <Col md={9}>
                        <Control.text model=".fullname" id="fullname" name="fullname" placeholder="Từ 5 đến 25 kí tự" className="form-control"
                          validators={{
                            required, minLength: minLength(5), maxLength: maxLength(25),
                          }} />
                        <Errors className="form-control" model=".fullname" show="touched" messages={{
                          required: "Không được để trống miền này",
                          minLength: "Không được ít hơn 5 kí tự",
                          maxLength: "Không được vượt quá 25 kí tự"
                        }} />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="doB" md={3}>
                        Ngày sinh
                      </Label>
                      <Col md={9}>
                        <Control.text
                          type="date"
                          model=".doB"
                          id="doB"
                          name="doB"
                          className="form-control"
                          validators={{
                            required,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".doB"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="startDate" md={3}>
                        Ngày vào
                      </Label>
                      <Col md={9}>
                        <Control.text
                          type="date"
                          model=".startDate"
                          id="startDate"
                          name="startDate"
                          className="form-control"
                          validators={{
                            required,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".startDate"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="department" md={3}>
                        Bộ phận
                      </Label>
                      <Col md={9}>
                        <Control.select
                          model=".department"
                          id="department"
                          name="department"
                          className="form-control"
                        >
                          <option value="Dept01" selected>Sale</option>
                          <option value="Dept02">HR</option>
                          <option value="Dept03">Marketing</option>
                          <option value="Dept04">IT</option>
                          <option value="Dept05">Finance</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="salaryScale" md={3}>
                        Hệ số lương
                      </Label>
                      <Col md={9}>
                        <Control.text
                          model=".salaryScale"
                          id="salaryScale"
                          name="salaryScale"
                          placeholder="1.0 -> 3.0"
                          className="form-control"
                          validators={{
                            required,
                            maxLength: maxLength(4),
                            isNumber,
                            validScale,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".salaryScale"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                            maxLength: "Hệ số lương không dài quá 3 kí tự. ",
                            isNumber: "Bắt buộc phải là số. ",
                            validScale:
                              "Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="annualLeave" md={3}>
                        Ngày nghỉ còn lại
                      </Label>
                      <Col md={9}>
                        <Control.text
                          model=".annualLeave"
                          id="annualLeave"
                          name="annualLeave"
                          placeholder="ex: 1.5"
                          className="form-control"
                          validators={{
                            required,
                            maxLength: maxLength(4),
                            isNumber,
                            validScale,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".annualLeave"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                            maxLength:
                              "Số ngày nghỉ phép không dài quá 3 kí tự",
                            isNumber: "Bắt buộc phải là số",
                            validScale:
                              "Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="overTime" md={3}>
                        Số ngày làm thêm
                      </Label>
                      <Col md={9}>
                        <Control.text
                          model=".overTime"
                          id="overTime"
                          name="overTime"
                          placeholder="ex: 1.5"
                          className="form-control"
                          validators={{
                            required,
                            maxLength: maxLength(4),
                            isNumber,
                            validScale,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".overTime"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                            maxLength:
                              "Số ngày nghỉ phép không dài quá 3 kí tự",
                            isNumber: "Bắt buộc phải là số",
                            validScale:
                              "Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={{ size: 10 }}>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined">
                          Thêm
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </div>
              </div>
            </ModalBody>
          </Modal>
          <div className="row">
            {menu}
          </div>
        </div>
      )
    }
  }
}
export default Menu;







