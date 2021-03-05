import React from 'react';
import { connect } from 'react-redux';

import { Button, Typography, Paper, TextField, Grid } from '@material-ui/core';

class User extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            friends: ''
        }
    };

    componentDidMount() {
        if (this.props.user) {
            this.setState({
                ...this.props?.user,
            })
        }
    }

    handleChange = (e, name) => {
        this.setState({[name]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = {
            name: this.state.name, email: this.state.email, address: this.state.address, friends: this.state.friends
        }

        let arr = JSON.parse(localStorage.getItem('user')) || [];
        if (this.props.isEdit) {
            arr = arr.map((item) => {
                if (item.id === this.props?.user?.id) {
                    console.log(item, this.props?.user?.id, 'fuck the code', userDetails)
                    return {...item, ...userDetails};
                }
                return item;
            })
        } else {
            arr.push({id: new Date().getTime(), ...userDetails});
        }


        if (arr && arr.length) {
            localStorage.setItem('user', JSON.stringify(arr));
        }
        this.props.showUserList();
    };

    render() {

        return(
            <>
                <Paper elevation={3} style={{padding: '24px'}}>
                    <Typography component={'p'} variant={'h6'} align={'center'}>{`${this.state.isEdit ? 'Edit' : 'Add'} User`}</Typography>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <Grid container spacing={2} style={{justifyContent: 'center'}}>
                            <Grid item lg={8} md={8}>
                                <TextField 
                                    id="name" 
                                    name="name"
                                    label="Name" 
                                    variant="outlined" 
                                    fullWidth
                                    defaultValue={this.props?.user?.name}
                                    onChange={(e) => this.handleChange(e, 'name')}
                                />
                            </Grid>
                            <Grid item lg={8} md={8}>
                                <TextField 
                                    type={'email'} 
                                    id="email" 
                                    name="email" 
                                    label="Email" 
                                    variant="outlined"
                                    fullWidth 
                                    defaultValue={this.props?.user?.email}
                                    onChange={(e) => this.handleChange(e, 'email')} />
                            </Grid>
                            <Grid item lg={8} md={8}>
                                <TextField 
                                    id="address" 
                                    name="address" 
                                    label="Address" 
                                    variant="outlined" 
                                    defaultValue={this.props?.user?.address}
                                    fullWidth onChange={(e) => this.handleChange(e, 'address')} 
                                />
                            </Grid>
                            <Grid item lg={8} md={8}>
                                <TextField 
                                    id="friends" 
                                    name="friends" 
                                    label="Friends" 
                                    variant="outlined" 
                                    placeholder={'List friends with comma separated'} 
                                    fullWidth 
                                    defaultValue={this.props?.user?.friends}
                                    onChange={(e) => this.handleChange(e, 'friends')} 
                                />
                            </Grid>
                            <Grid item lg={8} md={8}>
                                <Button type={'submit'} color={'primary'} variant={'contained'}>{'Save'}</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.User.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser : (data) => dispatch({type: 'SET_USER', payload: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);