import React, { Component } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Range, getTrackBackground } from 'react-range'
import { Navigate } from 'react-router'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '../pages/api'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginModalOpened: false,
            valuesS: [],
            valuesP: [],
            tableData: [],
            wordModalOpened: false,
            word: '',
            saveResultsModalOpened: false,
            updatedRow: {},
            wordsList: [],
            students: []
        }
    }

    componentDidMount() {
        Axios.get(api + "words",
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }).then(response => {
                this.setState({
                    tableData: response?.data.filter(i => i.user_id === this.props?.userData?.data?.[0].id)
                })
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

    onLogout = () => {
        this.props.listenToUserStatus(false)
    }

    onSliderChangeP = (values) => {
        this.setState({ valuesP: values })
    }

    onSliderChangeS = (values, key) => {
        const newTableData = [...this.state.tableData]
        newTableData[key].s_rate = parseInt(values)
        this.setState({
            valuesS: values,
            tableData: newTableData
        })
    }

    /* New Word Modal */

    onEnterNewWordModal = () => {
        Axios.get(api + "wordsList").then(response => {
            this.setState({
                wordsList: response?.data
            })
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
        this.setState({ wordModalOpened: true })
    }

    onCloseNewWordModal = () => {
        this.setState({ wordModalOpened: false })
    }

    onChangeWord = (e) => {
        this.setState({
            word: (this.state.wordsList.find(i => i.id === parseInt(e.target.value))).word
        })
    }

    onAddNewWordApi = () => {
        Axios.get(api + "students").then(response => {
            this.setState({
                students: response?.data
            })
        })
        setTimeout(() => {
            let body = this.state.students.map(i => {
                return ([this.state.word, 0, 0, i.id])
            })
            Axios.post(api + "addWord", {
                body
            }).then(response => {
                toast.success('Word successfully added!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                setTimeout(() => {
                    Axios.get(api + "words",
                        {
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache',
                                'Expires': '0'
                            }
                        }).then(response => {
                            this.setState({
                                tableData: response?.data.filter(i => i.user_id === this.props?.userData?.data?.[0].id)
                            })
                            this.onCloseNewWordModal(true)
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
                }, 1500)
            }).catch(err => {
                toast.error('There is a problem with server, please try again later!', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
        }, 1000)
    }

    /* Save Results Modal */

    onSaveResultsModal = (i) => {
        this.setState({
            saveResultsModalOpened: true,
            updatedRow: i
        })
    }

    onCloseSaveResultsModal = () => {
        this.setState({ saveResultsModalOpened: false })
    }

    onSaveTableApi = () => {
        Axios.post(api + "saveTable", {
            updatedRow: this.state.updatedRow
        }).then(response => {
            toast.success('Results are submitted!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            setTimeout(() => {
                Axios.get(api + "words",
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                        }
                    }).then(response => {
                        this.setState({
                            tableData: response?.data.filter(i => i.user_id === this.props?.userData?.data?.[0].id)
                        })
                        this.onCloseSaveResultsModal(true)
                    }).catch(err => {
                        toast.error('There is a problem with server, please try again later!', {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    })
            }, 1500)
        }).catch(err => {
            toast.error('There is a problem with server, please try again later!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }

    render() {
        const MIN = 0
        const MAX = 10

        return (
            <div className="pt-3 pb-5">
                <div className="logout-div mt-5 pt-4">
                    <Button variant="primary" type="button" className="orange-button mr-2" onClick={this.onLogout}>
                        Log out
                    </Button>
                </div>
                <h2 className="heading py-4">User: {this.props?.userData?.data?.[0].name}</h2>
                <div className="home-buttons">
                    <Table striped bordered hover className='w-80'>
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Rater</th>
                                <th>Competence</th>
                                <th>✅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((i, k) => {
                                    return (
                                        <>
                                            <tr key={k}>
                                                <td rowSpan="2">{i?.name}</td>
                                                <td>Student</td>
                                                <td colSpan="1" className='w-20'>
                                                    <div className='range-numbers'>
                                                        <span>0</span>
                                                        <span>1</span>
                                                        <span>2</span>
                                                        <span>3</span>
                                                        <span>4</span>
                                                        <span>5</span>
                                                        <span>6</span>
                                                        <span>7</span>
                                                        <span>8</span>
                                                        <span>9</span>
                                                        <span>10</span>
                                                    </div>
                                                    <div className="py-3 student-range">
                                                        <Range
                                                            values={[i.s_rate]}
                                                            min={MIN}
                                                            max={MAX}
                                                            onChange={(values) => this.onSliderChangeS(values, k)}
                                                            renderTrack={({ props, children }) => (
                                                                <div
                                                                    onMouseDown={props.onMouseDown}
                                                                    onTouchStart={props.onTouchStart}
                                                                    style={{
                                                                        ...props.style,
                                                                        display: "flex",
                                                                        width: "100%"
                                                                    }}
                                                                >
                                                                    <div
                                                                        ref={props.ref}
                                                                        style={{
                                                                            height: "8px",
                                                                            width: "100%",
                                                                            borderRadius: "5px",
                                                                            background: getTrackBackground({
                                                                                values: [i.s_rate],
                                                                                colors: ["#8c298c", "#8c298c63"],
                                                                                min: MIN,
                                                                                max: MAX
                                                                            }),
                                                                            alignSelf: "center"
                                                                        }}
                                                                    >
                                                                        {children}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            renderThumb={({ props, isDragged }) => (
                                                                <>
                                                                    <div
                                                                        {...props}
                                                                        style={{
                                                                            ...props.style,
                                                                            height: "22px",
                                                                            width: "22px",
                                                                            borderRadius: "100%",
                                                                            backgroundColor: "#8c298c",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                            boxShadow: "0px 2px 6px #AAA"
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td rowSpan="2">
                                                    <Button variant="primary" type="button" className="orange-button ml-2 mr-2" onClick={() => this.onSaveResultsModal(i)}>
                                                        Save
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr className='w-100'>
                                                <td colSpan="1" className='w-30'>
                                                    Professor
                                                </td>
                                                <td colSpan="1" className='w-40'>
                                                    <div className='range-numbers'>
                                                        <span>0</span>
                                                        <span>1</span>
                                                        <span>2</span>
                                                        <span>3</span>
                                                        <span>4</span>
                                                        <span>5</span>
                                                        <span>6</span>
                                                        <span>7</span>
                                                        <span>8</span>
                                                        <span>9</span>
                                                        <span>10</span>
                                                    </div>
                                                    <div className="py-3 student-range">
                                                        <Range
                                                            //values={this.state.valuesP}
                                                            values={[i?.p_rate]}
                                                            min={MIN}
                                                            max={MAX}
                                                            onChange={(values) => this.onSliderChangeP(values)}
                                                            renderTrack={({ props, children }) => (
                                                                <div
                                                                    onMouseDown={props.onMouseDown}
                                                                    onTouchStart={props.onTouchStart}
                                                                    style={{
                                                                        ...props.style,
                                                                        display: "flex",
                                                                        width: "100%"
                                                                    }}
                                                                >
                                                                    <div
                                                                        ref={props.ref}
                                                                        className="coloredbar"
                                                                        style={{
                                                                            height: "8px",
                                                                            width: "100%",
                                                                            borderRadius: "5px",
                                                                            background: getTrackBackground({
                                                                                values: [i?.p_rate],
                                                                                //colors: ["#046A38", "#046a3866"],
                                                                                colors: ["#046A38", "#046a3866"],
                                                                                min: MIN,
                                                                                max: MAX
                                                                            }),
                                                                            alignSelf: "center"
                                                                        }}
                                                                    >
                                                                        {children}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            renderThumb={({ props, isDragged }) => (
                                                                <div
                                                                    {...props}
                                                                    style={{
                                                                        ...props.style,
                                                                        height: "22px",
                                                                        width: "22px",
                                                                        borderRadius: "100%",
                                                                        backgroundColor: "#046A38",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        boxShadow: "0px 2px 6px #AAA"
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <div className="mt-4 mb-5">
                        <Button variant="primary" type="button" className="orange-button" onClick={this.onEnterNewWordModal}>
                            Enter a new word
                        </Button>
                    </div>
                    {/* New Word Modal */}
                    <PureModal
                        header="Choose a new word"
                        isOpen={this.state.wordModalOpened}
                        onClose={this.onCloseNewWordModal}
                    >
                        <div>
                            <Form className="login-form">
                                <Form.Group className="mb-3">
                                    <Form.Label>Word</Form.Label>
                                    <Form.Select aria-label="Words" onChange={(e) => this.onChangeWord(e)}>
                                        {
                                            this.state.wordsList.map(i => {
                                                return (
                                                    <option value={i.id}>{i.word}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className="orange-button"
                                    onClick={this.onAddNewWordApi}
                                >
                                    Add
                                </Button>
                            </Form>
                        </div>
                    </PureModal>
                    {/* Save Results Modal */}
                    <PureModal
                        header="Are you sure?"
                        isOpen={this.state.saveResultsModalOpened}
                        onClose={this.onCloseSaveResultsModal}
                    >
                        <div>
                            <Form className="login-form">
                                <div className="save-form">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="orange-button"
                                        onClick={this.onSaveTableApi}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="orange-button"
                                        onClick={this.onCloseSaveResultsModal}
                                    >
                                        No
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </PureModal>
                </div>
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