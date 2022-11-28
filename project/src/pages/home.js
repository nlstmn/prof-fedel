import React, { Component } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import HomeComponent from '../components/home'
import DashboardComponent from '../components/dashboard'
import DashboardComponentAdmin from '../components/dashboard_admin'
import { Navigate } from "react-router-dom"

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            count: 0
        }
    }

    listenToUserStatus = (value) => {
        if (value) {
            this.props.logIn()
            this.setState({ count: 1 })
        }
    }

    loggedUserData = (object) => {
        this.setState({ userData: object })
        this.props.logInUserData(object)
    }

    loggedUserDataAdmin = (value) => {
        if (value) {
            this.props.logIn()
            this.setState({ count: 2 })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.count === 1 ? <Navigate to={"/dashboard"} replace /> :
                        this.state.count === 2 ? <Navigate to={"/dashboard-admin"} replace /> :
                            <>
                                <Navbar className="navbar">
                                    <Container>
                                        <Navbar.Brand href="#home">Professor Fedel</Navbar.Brand>
                                    </Container>
                                </Navbar>
                                <HomeComponent
                                    listenToUserStatus={this.listenToUserStatus}
                                    loggedUserData={this.loggedUserData}
                                    loggedUserDataAdmin={this.loggedUserDataAdmin}
                                />
                                <Navbar className="navbar footer" fixed="bottom">
                                    <Container>
                                        <Navbar.Collapse className="justify-content-center">
                                            <Navbar.Text>
                                                Professor Fedel {new Date().getFullYear()} © All Rights Reserved.
                                            </Navbar.Text>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                            </>
                }
            </>
        )
    }
}