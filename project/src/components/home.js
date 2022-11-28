import React, { Component } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Axios from 'axios'
import DashboardComponent from './dashboard'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '../pages/api'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginModalOpened: false,
            registerModalOpened: false,
            adminModalOpened: false,
            name: "",
            email: "",
            password: ""
        }
    }

    onOpenLoginForm = () => {
        this.setState({ loginModalOpened: true })
    }

    onCloseLoginForm = () => {
        this.setState({ loginModalOpened: false })
    }

    onOpenRegisterForm = () => {
        this.setState({ registerModalOpened: true })
    }

    onCloseRegisterForm = () => {
        this.setState({ registerModalOpened: false })
    }

    onOpenAdminForm = () => {
        this.setState({ adminModalOpened: true })
    }

    onCloseAdminForm = () => {
        this.setState({ adminModalOpened: false })
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onRegisterApi = () => {
        Axios.post(api + "register", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response?.data === "Error!") {
                toast.error('Error!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.success('User is successfully registered!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    this.onCloseRegisterForm()
                }, 1500)
            }
        }).catch(err => {
            toast.error('There is a problem with server, please try again later!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        })
    }

    onLoginApi = () => {
        Axios.post(api + "login", {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response?.data === "Wrong credentials!") {
                toast.error('Wrong email or password!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.success('User successfully logged in!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    this.props.listenToUserStatus(true)
                    this.props.loggedUserData(response)
                }, 1500)
            }
        }).catch(err => {
            toast.error('There is a problem with server, please try again later!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        })
    }

    onAdminApi = () => {
        Axios.post(api + "admin", {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response?.data === "Wrong credentials!") {
                toast.error('Wrong email or password!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.success('Admin successfully logged in!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    this.props.listenToUserStatus(true)
                    this.props.loggedUserData(response)
                    this.props.loggedUserDataAdmin(true)
                }, 1500)
            }
        }).catch(err => {
            toast.error('There is a problem with server, please try again later!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        })
    }

    render() {
        return (
            <div className="py-5">
                <h2 className="heading pb-4">Modal Login Form</h2>
                <div className="home-buttons">
                    <Button variant="primary" type="button" className="orange-button mb-3" onClick={this.onOpenLoginForm}>
                        Login
                    </Button>
                    <Button variant="primary" type="button" className="orange-button mb-3" onClick={this.onOpenRegisterForm}>
                        Register
                    </Button>
                    <Button variant="primary" type="button" className="orange-button" onClick={this.onOpenAdminForm}>
                        Admin Login
                    </Button>
                </div>
                {/* Login Modal */}
                <PureModal
                    header="Login"
                    footer={
                        <div>
                            <Button variant="link" className="link-span">Forgot password?</Button>
                        </div>
                    }
                    isOpen={this.state.loginModalOpened}
                    onClose={this.onCloseLoginForm}
                >
                    <div>
                        <Form className="login-form">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                className="orange-button"
                                onClick={this.onLoginApi}
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </PureModal>
                {/* Register Modal */}
                <PureModal
                    header="Register"
                    isOpen={this.state.registerModalOpened}
                    onClose={this.onCloseRegisterForm}
                >
                    <div>
                        <Form className="login-form">
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                                <Form.Text className="text-muted">
                                    Check and type your password carefully, then save it!
                                </Form.Text>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                className="orange-button"
                                onClick={this.onRegisterApi}
                            >
                                Register
                            </Button>
                        </Form>
                    </div>
                </PureModal>
                {/* Admin Modal */}
                <PureModal
                    header="Admin"
                    footer={
                        <div>
                            <Button variant="link" className="link-span">Forgot password?</Button>
                        </div>
                    }
                    isOpen={this.state.adminModalOpened}
                    onClose={this.onCloseAdminForm}
                >
                    <div>
                        <Form className="login-form">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                className="orange-button"
                                onClick={this.onAdminApi}
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </PureModal>
                <ToastContainer
                    position="bottom-left"
                    className="toast-container-mobile"
                    autoClose={1500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}