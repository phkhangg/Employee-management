import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse,Jumbotron} from 'reactstrap';

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            isNavOpen:false,
        }
        this.toggleNav=this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState={
            isNavOpen:!this.state.isNavOpen,
        }
    }

    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/"><img src="asset/images/FUNIX.png" width="40px" height="40px" alt="FUNIXASM"></img></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-user-circle fa-lg"></span> Nhân viên 
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/department">
                                        <span className="fa fa-building fa-lg"></span> Phòng ban
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-credit-card fa-lg"></span> Bảng Lương
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <h2>FUNIX</h2>
                            <p>Không có phép thuật nào biến giấc mơ thành hiện thực, chỉ có sự chăm chỉ, lòng quyết tâm và tâm thế luôn sẵn sàng nỗ lực hết mình mới có thể giúp chúng ta đạt được những gì mình mong muốn.</p>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}
export default Header;