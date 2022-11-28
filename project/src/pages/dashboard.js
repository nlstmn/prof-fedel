import React, { Component } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import HomeComponent from '../components/home'
import DashboardComponent from '../components/dashboard'
import DashboardComponentAdmin from '../components/dashboard_admin'
import { Navigate } from "react-router-dom"

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
    }

    listenToUserStatus = (value) => {
        if (!value) {
            this.props.logOut()
            this.setState({ count: 0 })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.count === 0 ? <Navigate to={"/home"} replace /> :
                        <>
                            <Navbar className="navbar" fixed="top">
                                <Container>
                                    <Navbar.Brand href="#home">Professor Fedel</Navbar.Brand>
                                </Container>
                            </Navbar>
                            <DashboardComponent
                                listenToUserStatus={this.listenToUserStatus}
                                userData={this.props.userData}
                            />
                            <Navbar className="navbar footer">
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