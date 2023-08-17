import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { connect } from "react-redux";
import {
  fetchDepartOfStaff
} from "../redux/ActionCreator";
import { FadeTransform } from "react-animation-components";



// connect store
const mapStateToProps = (state) => {
  return {
    staffOfDeparts: state.staffOfDeparts,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchDepartOfStaff: (departId) => dispatch(fetchDepartOfStaff(departId)),
});

class Staffofdepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      // loaded: false,
      // placeholder: "Loading"
    };
  }
  componentDidMount() {
    console.log("this.props.departId", this.props.match.params.id)

    this.props.fetchDepartOfStaff(this.props.match.params.id)
  }

  render() {
    const RenderMenuItem = ({ staff }) => {
      return (
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Card>
            <Link to={`/menu/${staff.id}`}>
              <CardImg width="100%" src="/asset/images/alberto.png" alt={staff.name} />
              <CardTitle className="text-center">{staff.name}</CardTitle>
            </Link>
          </Card>
        </FadeTransform>
      );
    };
    const menu = this.props.staffOfDeparts.staffOfDeparts.map((staff) => {
      return (
        <div className="col-6 col-md-4 col-lg-2 mb-2" key={staff.id}>
          <RenderMenuItem staff={staff} />
        </div>
      );
    });
    if (this.props.staffOfDeparts.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffOfDeparts.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>{this.props.staffOfDeparts.errMess}</h3>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="container">
          <div className="row mt-5">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/department">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Staff of Department</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12 text-white">
              <h3>Danh sách nhân viên</h3>
              <hr />
            </div>
          </div>
          <div className="row">{menu}</div>
        </div>
      );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Staffofdepart);