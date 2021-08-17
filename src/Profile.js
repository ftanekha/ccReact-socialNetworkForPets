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
        let isLoading = this.state.userData === null ? true : false,
        name,
        className = 'Profile',
        bio,
        friends = [];
        //display the user’s name, bio & friends
        if (isLoading) {
            name = 'Loading...'
            className += ' loading'
            bio = 'Loading bio...'
        }else{
            name = this.state.userData.name
            bio = this.state.userData.bio
            friends = this.state.userData.friends
        }

        return (
        <div className={className}>
            <div className='profile-picture'>
            { !isLoading && <img src={this.state.userData.profilePictureUrl} alt='' /> }
            </div>
            <div className='profile-body'>
                <h2>{name}</h2>
                <h3>@{this.props.username}</h3>
                <p>{bio}</p>
                <h3>My friends</h3>
                <Userlist usernames={friends} onChoose={this.props.onChoose} />
            </div>
        </div>
        );
    }
    //load user data when the component first mounts
    componentDidMount(){
        this.loadUserData()
    }
    //update
    componentDidUpdate(prevProps){
        if(this.props.username !== prevProps.username){
            cancelFetch(this.fetchID); 
            this.loadUserData();
        }
    }
    //cleanup
    componentWillUnmount(){
        cancelFetch(this.fetchID)
    }
}