import React from 'react';
import PropTypes from 'prop-types';
import { validate } from './validations';

const withValidations = ({ name: formName }) => Component => {
  class FormComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validations: {},
        values: {
          [formName]: {
            ...props.defaults,
            loading: true,
          },
        },
        touched: {},
        errors: {},
        error: '',
      };
      this.handleBlur = this.handleBlur.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleBatches = this.handleBatches.bind(this);
      this.handleValidate = this.handleValidate.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleError = this.handleError.bind(this);
      this.validate = this.validate.bind(this);
      this.handleProps = this.handleProps.bind(this);
      this.InputProps = this.InputProps.bind(this);
      this.DropdownProps = this.DropdownProps.bind(this);
      this.CheckboxProps = this.CheckboxProps.bind(this);
    }

    InputProps = key => ({
      onChange: this.handleUpdate,
      onBlur: this.handleBlur,
      name: key,
      value: this.state.values[formName][key],
      touched: this.state.touched[key],
      error: this.state.errors[key],
    });

    DropdownProps = key => ({
      onChange: val => this.handleUpdate(key, val),
      onBlur: this.handleBlur,
      value: this.state.values[formName][key],
      touched: this.state.touched[key],
      error: this.state.errors[key],
    });

    CheckboxProps = key => ({
      onChange: val => this.handleUpdate(key, val),
      checked: this.state.values[formName][key],
      touched: this.state.touched[key],
      error: this.state.errors[key],
    });

    handleProps(type) {
      return (key, rules = []) => {
        const { validations } = this.state;
        if (!validations[key]) {
          validations[key] = { params: rules };
          this.setState({ validations });
        }
        return type(key);
      };
    }

    handleBlur(e) {
      const { name } = e.target;
      const { touched } = this.state;
      touched[name] = true;
      this.setState({ touched }, this.validate);
    }

    handleUpdate(e, providedValue, doValidate = true) {
      const { values, touched } = this.state;
      const { name, value } = typeof e === 'string' ? { name: e } : e.target;
      this.setState({
        values: {
          ...values,
          [formName]: {
            ...values[formName],
            [name]: providedValue !== undefined ? providedValue : value,
          },
        },
        touched: {
          ...touched,
          [name]: doValidate,
        },
      }, this.validate);
    }

    handleBatches(values) {
      const { values: origin } = this.state;
      this.setState(({
        values: {
          ...origin,
          [formName]: {
            ...origin[formName],
            ...values,
          },
        },
      }));
    }

    handleError(error) {
      this.setState({ error });
    }

    handleValidate() {
      const { touched, validations } = this.state;
      let isTouched = true;
      Object.keys(validations).forEach(key => {
        if (!touched[key]) isTouched = false;
        touched[key] = true;
      });
      if (!isTouched) {
        return this.validate(touched);
      }
      return this.validate();
    }

    validate(provided) {
      const { values, touched: origin, validations } = this.state;
      const touched = provided || origin;
      const errors = {};

      Object.keys(validations).forEach(key => {
        const touch = touched[key];

        if (touch) {
          const validator = validations[key];
          const value = values[formName][key];

          const checks = validator.params || [];
          checks.forEach(check => {
            const valid = validate(check, value, values[formName]);
            if (errors[key]) return;
            if (valid !== true) errors[key] = valid;
          });
        }
      });
      this.setState({ errors, touched, error: '' });
      const ret = { ...values[formName] };
      delete ret.loading;
      return { errors, values: ret };
    }

    handleReset(defaults) {
      this.setState({
        values: {
          [formName]: defaults || {},
        },
        touched: {},
        errors: {},
        error: '',
      });
    }

    render() {
      const {
        InputProps,
        DropdownProps,
        CheckboxProps,
        handleProps,
        handleValidate,
        handleUpdate,
        handleBatches,
        handleReset,
        handleError,
        props: { onSubmit, ...props },
        state: { values: { [formName]: { loading, ...values } }, error },
      } = this;
      return (
        <Component
          {...props}
          form={{
            loading,
            InputProps: handleProps(InputProps),
            DropdownProps: handleProps(DropdownProps),
            CheckboxProps: handleProps(CheckboxProps),
            onValidate: handleValidate,
            onUpdate: handleUpdate,
            onBatches: handleBatches,
            onReset: handleReset,
            onError: handleError,
            values,
            error,
          }}
          onSubmit={onSubmit}
        />
      );
    }
  }

  FormComponent.getInitialProps = Component.getInitialProps;

  FormComponent.propTypes = {
    defaults: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  FormComponent.defaultProps = {
    defaults: {},
    onSubmit: () => {},
  };

  return FormComponent;
};

export default withValidations;
