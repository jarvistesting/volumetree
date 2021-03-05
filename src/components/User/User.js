import React from 'react';
import { connect } from 'react-redux';

import { Button, Box, Grid } from '@material-ui/core';

import AddUser from './AddUser';
import ListUser from './ListUser';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addUser: false,
            listUser: true,
            editUser: false,
        }
    };

    showUserList = () => {
        this.setState({listUser: !this.state.listUser, addUser: false, editUser: false});
    }

    showAddUser = (isEdit = false) => {
        this.setState({addUser: true, listUser: false, editUser: isEdit});
    }

    render(){
        return(
            <>
                <Box style={{textAlign: 'center'}} mt={2} mb={2}>
                    <Button 
                        color={'primary'} 
                        variant={'contained'} 
                        style={{marginRight: '8px'}}
                        onClick={this.showAddUser}
                    >
                        {'Add User'}
                    </Button>
                    <Button 
                        color={'primary'} 
                        variant={'contained'}
                        onClick={this.showUserList}
                    >
                        {'List User'}
                    </Button>
                </Box>

                {this.state.addUser ? (
                    <Box>
                        <AddUser editUser={this.state.editUser} showUserList={this.showUserList} />
                    </Box>
                ) : null}

                {this.state.listUser ? (
                    <Box>
                        <ListUser showAddUser={this.showAddUser} isEdit={this.state.editUser} />
                    </Box>
                ) : null}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang : state.lang
    }
}

export default connect(mapStateToProps,null)(User);