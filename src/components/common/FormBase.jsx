import React, { Component } from 'react';
import Joi from 'joi-browser';
import Button from './Button';
import FormInput from './FormInput';
import FormGroup from './FormGroup';

class FormBase extends Component {
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

    validate = () => {
        const options = { abortEarly: false };
        const errors = {
            username: '',
            password: ''
        };

        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return errors;

        error.details.forEach((x) => (errors[x.path[0]] = x.message));

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const object = {
            [name]: value
        };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(object, schema);

        return error ? error.details[0].message : null;
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validate();
        console.log('errors', errors);
        this.setState({ errors });
        if (errors.username || errors.password) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const error = this.validateProperty(input);
        if (error) errors[input.name] = error;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };

    renderInput = (name, type = 'text') => {
        const { data, errors } = this.state;
        return (
            <FormGroup>
                <FormInput
                    value={data[name]}
                    name={name}
                    onChange={this.handleChange}
                    type={type}
                    error={errors[name]}
                />
            </FormGroup>
        );
    };

    renderButton = (label) => {
        const validation = this.validate();
        return (
            <Button
                className={'btn btn-primary'}
                disabled={!!(validation.username || validation.password)}
            >
                {label}
            </Button>
        );
    };
}

export default FormBase;
