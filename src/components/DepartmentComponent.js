import React, {Component}from 'react';
import { Breadcrumb, BreadcrumbItem, CardText, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
// import { DEPARTMENTS, STAFFS } from '../share/staffs';
import {Loading} from './LoadingComponent';
import { Fade } from 'react-animation-components';

class Department extends Component{
    constructor(props){
        super(props);

        this.state={
            departments: this.props.departments,
            staffs: this.props.staffs,
        }
    }
    render(){
        const departments=this.state.departments.departments.map((department)=>{
            return(
                <Fade in className="col-12 col-md-6 col-lg-4" key={department.id}>
                    <Card className="ml-2 mb-4 text-center bg-dark text-light border-light">
                        <Link to={`/department/${department.id}`}>
                            <CardText className="m-3 text-warning">
                                {department.name}
                                <br/>
                                Số lượng nhân viên: {department.numberOfStaff}
                            </CardText>
                        </Link>
                    </Card>
                </Fade>
            )
        });
        if(this.state.departments.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            )
        }else if(this.state.departments.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>{this.state.departments.errMess}</h3>
                        </div>
                    </div>
                </div>
            )
        }else
        return(
            <div className="container">
                <div className="row mt-5">
                <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Department</BreadcrumbItem>
                    </Breadcrumb>              
                </div>
                <div>
                    <h3>Các phòng ban</h3>
                    <br/>
                </div>
                <div className="row mb-5">
                    {departments}
                </div>
            </div>
        )
    }
}
export default Department;