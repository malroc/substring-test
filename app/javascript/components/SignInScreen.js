import React from 'react'
import { withRouter } from 'react-router'

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

      this.setState({
        password: '',
        emailErrors: (data['errors']['email'] || []).join(', '),
        passwordErrors: (data['errors']['password'] || []).join(', ')
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
            className="form-control"
            value={this.state.email}
            onChange={(evt) => this.setState({email: evt.target.value})}
          />
        </div>
        {!!this.state.emailErrors ? (
          <div className="alert alert-danger" role="alert">
            {this.state.emailErrors}
          </div>
        ) : ''}
        <div className="input-group mb-3">
          <input
            placeholder="Password"
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(evt) => this.setState({password: evt.target.value})}
          />
        </div>
        {!!this.state.passwordErrors ? (
          <div className="alert alert-danger" role="alert">
            {this.state.passwordErrors}
          </div>
        ) : ''}
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
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignInScreen)
