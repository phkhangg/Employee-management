import React, { useState } from "react";
import { Breadcrumb,
    BreadcrumbItem,
    Button,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    Col,
    Row, } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat'; 
// import * as moment from "moment";
import { Control, LocalForm, Errors } from "react-redux-form";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { Loading } from "./LoadingComponent";



function RenderId({staff, handleDelete,editStaff}){
    //date
    // staff.doB=moment(item.doB).format("YYYY-MM-DD");
    // staff.startDate=moment(item.startDate).format("YYYY-MM-DD");
    //open Model
    const[open,setOpen]=useState(false);
    const handleClick=()=>setOpen(!open);
    //
    const required = (val) => val;
    const maxLength = (len) => (val) =>
    val ? val.toString().length <= len : false;
    const minLength = (len) => (val) =>
    val ? val.toString().length >= len : false;
    const isNumber = (val) => !isNaN(Number(val));
    const validScale = (val) => /^[0-9]+\.[0-9]+$/i.test(val);
    const handleSubmit = (values) => {
        //cập nhật thông tin nhân viên
        const updateStaff = {
          id: staff.id,
          name: values.name,
          doB: values.doB,
          salaryScale: +values.salaryScale,
          startDate: values.startDate,
          departmentId: values.departmentId,
          annualLeave: +values.annualLeave,
          overTime: +values.overTime,
          image: "/asset/images/alberto.png",
        };
        editStaff(updateStaff);
        setOpen(!open);
        alert("Cập nhật nhân viên " + updateStaff.name + " thành công!");
      };
      return (
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-md-4 col-lg-3">
              {/* <FadeTransform in> */}
                <img
                  width="100%"
                  height="280px"
                  src="/asset/images/alberto.png"
                  alt={staff.name}
                />
              {/* </FadeTransform> */}
            </div>
            <div className="col-12 col-md-8 col-lg-9 border">
              <Stagger in>
                <div className="d-flex justify-content-between mt-3">
                  <h5 className="mt-2">Họ và Tên: {staff.name}</h5>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() => handleClick()} // gọi hàm sửa 
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(staff.id)} // gọi hàm xóa 
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <Fade in>
                  <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                  <p>Hệ số lương: {staff.salaryScale}</p>
                  <p>
                    Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                  </p>
                  <p>Bộ phận: {staff.department}</p>
                  <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                  <p>Số ngày làm thêm: {staff.overTime}</p>
                </Fade>
              </Stagger>
            </div>
          </div>
    
          {/* modal sửa nhân viên  */}
          <Modal isOpen={open} toggle={handleClick} className="col-10">
            <ModalHeader>Sửa nhân viên</ModalHeader>
            <ModalBody>
              <div className="row row-content">
                <div className="col-12 text-center">
                  <h3>Vui lòng điền chính xác và đầy đủ thông tin vào form sau:</h3>
                </div>
                <div className="col-12">
                  <LocalForm
                    onSubmit={(values) => handleSubmit(values)}
                    initialState={staff}
                  >
                    <Row className="form-group">
                      <Label htmlFor="fullname" md={3}>
                        Họ Tên
                      </Label>
                      <Col md={9}>
                        <Control.text
                          model=".name"
                          id="name"
                          name="name"
                          placeholder="từ 5 - 30 kí tự"
                          className="form-control"
                          validators={{
                            required,
                            minLength: minLength(5),
                            maxLength: maxLength(30),
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".name"
                          show="touched"
                          messages={{
                            required: "Không được để trống. ",
                            minLength: "Họ tên tối thiểu 5 kí tự",
                            maxLength: "Họ tên bạn không dài quá 30 kí tự",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="dob" md={3}>
                        Ngày sinh
                      </Label>
                      <Col md={9}>
                        <Control.text
                          type="date"
                          model=".doB"
                          id="dob"
                          name="dob"
                          className="form-control"
                          validators={{
                            required,
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".dob"
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
                          model=".departmentId"
                          id="department"
                          name="department"
                          className="form-control"
                        >
                          <option value="Dept01" selected>
                            Sale
                          </option>
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
                            maxLength: "Số ngày nghỉ phép không dài quá 3 kí tự",
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
                            maxLength: "Số ngày nghỉ phép không dài quá 3 kí tự",
                            isNumber: "Bắt buộc phải là số",
                            validScale:
                              "Hệ số phải chứa dấu chấm giữa 2 số(ví dụ 1.5)",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ size: 10 }}>
                        <Button type="submit" color="primary">
                          Cập nhật
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    const StaffDetail = (props) => {
        //xóa nhân viên
        const handleDelete = (id) => {
          // if (confirm("Warning: Bạn khẳng định muốn xóa nhân viên này?")) {
            props.deleteStaff(id); 
            props.history.push("/stafflist");
          // };
        };
        if (props.isLoading) {
          return (
            <div className="container">
              <div className="row">
                <Loading />
              </div>
            </div>
          );
        } else if (props.errMess) {
          return (
            <div className="container">
              <div className="row">
                <h4>{props.errMess}</h4>
              </div>
            </div>
          );
        } else if (props.staff != null)
          return (
            <div className="container">
              <div className="row mt-5">
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/menu">Stafflist</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>{props.staff.name}</h3>
                  <hr />
                </div>
              </div>
              <div>
                <RenderId
                  staff={props.staff}
                  handleDelete={handleDelete} 
                  postStaff={props.postStaff}
                  editStaff={props.editStaff}
                />
              </div>
            </div>
          );
        else return <div></div>;
      };
      
      export default StaffDetail;
      
      
      
    


