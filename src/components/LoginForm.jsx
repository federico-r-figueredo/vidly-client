import React, { Component } from 'react';
import Joi from 'joi-browser';
import Row from '../components/common/Row';
import Column from './common/Column';
import Card from './common/Card';
import FormBase from './common/FormBase';
import Form from './common/Form';

class LoginForm extends FormBase {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {
            username: '',
            password: ''
        }
    };

    schema = {
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
            .label('Username'),
        password: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
            .label('Password')
    };

    doSubmit = () => {
        console.log('data', this.state.data);
    };

    render() {
        return (
            <Row>
                <Column width={12}>
                    <Card>
                        <h1>Login</h1>
                        <Form onSubmit={this.handleSubmit}>
                            {this.renderInput('username')}
                            {this.renderInput('password', 'password')}
                            {this.renderButton('Login')}
                        </Form>
                    </Card>
                </Column>
            </Row>
        );
    }
}

export default LoginForm;
