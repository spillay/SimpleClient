import React from 'react';
import { owners } from './backend/dbconfig';
import { addUser } from './backend/dbconfig';
import withData from './backend/withData'


class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gql: owners
        }

    }
    onClick = (e) =>{
        console.log(e);
        this.addUsersAsPromise();
    }
    getUsers = () => {
        return this.state.gdata.data.owners.map(({ id, name }) => (
            <div key={id}>
                <p>{`${id}: ${name}`}</p>
            </div>
        ));
    }
    addUsersAsPromise = () => {
        this.mutateData(addUser,{ name: "test3",email: "test3@test.cz",cellNumber: "479332973"})
        .then(result=>{
            console.log(result)
        })
    }
    getUsersAsPromise = () => {
        this.readData(owners)
        .then(result=>{
            console.log(result)
        })
        
    }
    render() {
        console.log(this.state)
        if (this.state.gdata === undefined) {
            return (<div>loading</div>)
        } else {
            return (
                <div>
                    <div>{this.getUsers()}</div>
                    <button onClick={this.onClick}>Add</button>
                </div>
            );
        }


    }
}
export default withData(User);