import React from 'react';
import { connect } from 'react-redux';

import { Typography, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {actionRequest, actionReceive} from '../../store/User/UserAction';

const headCell = [
    'Name',
    'Email',
    'Address',
    'Friends',
    'Actions'
];

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
        }
    };

    componentDidMount() {
        this.props.getUser();
    }

    handleEdit = (e, id) => {
        const arr = JSON.parse(localStorage.getItem('user')) || [];
        let user = {};

        for(let i=0; i<arr.length; i++) {
            if (arr[i].id === id) {
                user = Object.assign({}, arr[i]);
                break;
            }
        }
        console.log("edit user", user);
        this.props.editUser(user);
        setTimeout(() => {
            this.props.showAddUser(true);
        },500)
    }

    handleDelete = (e, id) => {
        const arr = JSON.parse(localStorage.getItem('user'));
        const deletedList = arr.filter(item => {
            return item.id !== id
        });

        localStorage.setItem('user', JSON.stringify(deletedList));
        this.props.getUser();
    }
    
    render(){

        return(
            <>
                <Paper elevation={3} style={{padding: '24px'}}>
                    <Typography variant={'h6'} align={'center'}>{'User List'}</Typography>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    { headCell.map((head, index) => {
                                        return <TableCell key={`${head}_${index}`}>{head}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.user && this.props.user.length ? (
                                    this.props.user.map((row, index) => (
                                        <TableRow key={`${row.id}`}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.friends}</TableCell>
                                            <TableCell>
                                                <EditIcon style={{cursor: 'pointer'}} onClick={(e) => this.handleEdit(e, row.id)} />
                                                <DeleteIcon style={{cursor: 'pointer'}} onClick={(e) => this.handleDelete(e, row.id)} />
                                            </TableCell>
                                        </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell scope="row" align={'center'} colSpan={4}>
                                            <Typography variant={'h6'}>{'No User Found'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("USER LIST", state);

    return {
        user : state.User.userList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser : () => dispatch(actionRequest()),
        editUser: (user) => dispatch(actionReceive(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);