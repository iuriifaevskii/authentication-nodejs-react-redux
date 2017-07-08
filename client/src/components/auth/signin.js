import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
    handleSubmit({email,password}){
        console.log(email,password);
    }

    render(){
        const { handleSubmit, fields: {email, password }} = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" />
                </fieldset>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin);