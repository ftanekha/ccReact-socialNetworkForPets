import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
    // first thing we’ll want to do is load user data into the component’s state
    constructor(props){
        super(props)
        this.state = { userData: null }
    }
    loadUserData(){
        // set userData state to null while the data is loading
        const isLoading = true
        if(isLoading) this.setState({ userData: null })
        //fetchUserData (simulates real user data) 
        this.fetchID = fetchUserData(this.props.username, (userData) => {
            this.setState({ userData });
        });
    }
    render() {
        //isLoading should only be true when this.state.userData === null
        let isLoading = this.state.userData === null ? true : false,

        className = 'Profile'
        if (isLoading) {
            className += ' loading'
        }

        return (
        <div className={className}>
            <div className="profile-picture"></div>
            <div className="profile-body">
                <h2>Name goes here</h2>
                <h3>@{this.props.username}</h3>
                <p>Bio goes here</p>
                <h3>My friends</h3>
                <Userlist usernames={[]} onChoose={this.props.onChoose} />
            </div>
        </div>
        );
    }
    //load user data when the component first mounts
    componentDidMount(){
        this.loadUserData()
    }
}