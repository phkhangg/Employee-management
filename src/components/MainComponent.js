import React, { Component } from 'react';
import Menu from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Department from './DepartmentComponent';
import StaffDetail from './StaffDetailComponent';
import Salary from './SalaryComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import dateFormat from 'dateformat';
import { STAFFS } from '../share/staffs';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {
  fetchStaffs,
  postStaff,
  fetchDepartments,
  deleteStaff,
  editStaff,
} from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Staffofdepart from "./StaffofDepartComponent";


const mapStateToProps=state=>{
  return{
    staffs:state.staffs,
    departments: state.departments,
    role: state.role,
  }
}
const mapDispatchToProps=dispatch=>({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  postStaff: (newStaff) => dispatch(postStaff(newStaff)),
  deleteStaff: (id) => dispatch(deleteStaff(id)),
  editStaff: (staff) => dispatch(editStaff(staff)),
});
class Main extends Component{
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }
  render(){
    const HomePage = () => {
      return <Home />;
    };
    const StaffWithId=({match,history})=>{
      console.log(match.params.staffid)
      return(
        <StaffDetail staff={this.props.staffs.staffs.filter((staff)=> staff.id=== parseInt(match.params.id,10))[0]}
        isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          postStaff={this.props.postStaff}
          deleteStaff={this.props.deleteStaff}
          editStaff={this.props.editStaff}
          history={history}
      />
      )}
    const DepartWithId = ({ match }) => {
      console.log(match)
      return <Staffofdepart departId={match.params.id} />;
    };

    const SalaryId = ({ match }) => {
      return <Salary salaryId={match.params.id} />;
    };
    return(
      <div className="App">
        <Header/>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
        <Switch>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/department" component={()=>(<Department departments={this.props.departments}/>)}/>
          <Route exact path="/department/:id" component={Staffofdepart} />
          <Route exact path="/menu" component={() => (<Menu postStaff={this.props.postStaff} staffs={this.props.staffs}/>)}/>
          <Route exact path="/menu/:id" component={StaffWithId}/>
          <Route exact path="/salary" component={() => <Salary component={SalaryId} />}/>
          {/* <Redirect to='/home'/> */}
          {/* <Redirect to='/staff'/> */}
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
