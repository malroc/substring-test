import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class SignInScreen extends React.Component {
  sessionsUrl = '/api/v1/sessions'
  requestHeaders = {'Content-Type': 'application/json'}

  constructor(props) {
    super(props)

    this.state = {email: '', password: '', emailErrors: '', passwordErrors: ''}
  }

  async createSession() {
    let response =
      await fetch(
        this.sessionsUrl,
        {
          method: 'POST',
          headers: this.requestHeaders,
          body: JSON.stringify(
            {'email': this.state.email, 'password': this.state.password}
          )
        }
      )

    if (response.status == 201) {
      this.props.history.push('/')
    } else {
      let data = await response.json()
      let errors = data['errors']

      this.setState({
        password: '',
        emailErrors: (errors['email'] || []).join(', '),
        passwordErrors: (errors['password'] || []).join(', ')
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        <h1>Sign In</h1>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              () => this.createSession()
            }
          >
            <i className="fa fa-sign-in" />
            &nbsp;
            Sign in
          </button>
          <span className="mt-2">
            &nbsp;
            or
            &nbsp;
            <Link to="/sign_up">
              Sign up
            </Link>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignInScreen)
