import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class SignUpScreen extends React.Component {
  usersUrl = '/api/v1/users'
  requestHeaders = {'Content-Type': 'application/json'}

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      emailErrors: '',
      passwordErrors: '',
      passwordConfirmationErrors: ''
    }
  }

  async createUser() {
    let response =
      await fetch(
        this.usersUrl,
        {
          method: 'POST',
          headers: this.requestHeaders,
          body: JSON.stringify({
            'email': this.state.email,
            'password': this.state.password,
            'password_confirmation': this.state.passwordConfirmation
          })
        }
      )

    if (response.status == 201) {
      this.props.history.push('/')
    } else {
      let data = await response.json()
      let errors = data['errors']

      this.setState({
        password: '',
        passwordConfirmation: '',
        emailErrors: (errors['email'] || []).join(', '),
        passwordErrors: (errors['password'] || []).join(', '),
        passwordConfirmationErrors:
          (errors['password_confirmation'] || []).join(', ')
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <div className="input-group mb-3">
          <input
            placeholder="Email"
            className={
              'form-control ' + (!!this.state.emailErrors ? 'is-invalid' : '')
            }
            value={this.state.email}
            onChange={(evt) => this.setState({email: evt.target.value})}
          />
          {!!this.state.emailErrors ? (
            <div className="invalid-feedback">
              {this.state.emailErrors}
            </div>
          ) : ''}
        </div>
        <div className="input-group mb-3">
          <input
            placeholder="Password"
            type="password"
            className={
              'form-control ' +
                (!!this.state.passwordErrors ? 'is-invalid' : '')
            }
            value={this.state.password}
            onChange={(evt) => this.setState({password: evt.target.value})}
          />
          {!!this.state.passwordErrors ? (
            <div className="invalid-feedback">
              {this.state.passwordErrors}
            </div>
          ) : ''}
        </div>
        <div className="input-group mb-3">
          <input
            placeholder="Password confirmation"
            type="password"
            className={
              'form-control ' +
                (!!this.state.passwordConfirmationErrors ? 'is-invalid' : '')
            }
            value={this.state.passwordConfirmation}
            onChange={
              (evt) => this.setState({passwordConfirmation: evt.target.value})
            }
          />
          {!!this.state.passwordConfirmationErrors ? (
            <div className="invalid-feedback">
              {this.state.passwordConfirmationErrors}
            </div>
          ) : ''}
        </div>
        <div className="input-group mb-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={
              () => this.createUser()
            }
          >
            <i className="fa fa-user-plus" />
            &nbsp;
            Sign up
          </button>
          <span className="mt-2">
            &nbsp;
            or
            &nbsp;
            <Link to="/sign_in">
              Sign in
            </Link>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignUpScreen)
