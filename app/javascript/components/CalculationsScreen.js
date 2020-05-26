import React from 'react'
import { withRouter } from 'react-router'

class CalculationsScreen extends React.Component {
  calculationsUrl = '/api/v1/calculations'
  sessionsUrl = '/api/v1/sessions'
  requestHeaders = {'Content-Type': 'application/json'}

  constructor(props) {
    super(props)

    this.state = {calculations: [], newA: '', newB: ''}
  }

  componentDidMount() {
    this.fetchCalculations()
  }

  async fetchCalculations() {
    let response =
      await fetch(this.calculationsUrl, {headers: this.requestHeaders})

    if (response.status == 200) {
      let calculations = await response.json()
      this.setState({calculations: calculations})
    } else {
      this.props.history.push('/sign_in')
    }
  }

  async destroyCalculation(calculationId) {
    await fetch(
      `${this.calculationsUrl}/${calculationId}`,
      {method: 'DELETE', headers: this.requestHeaders}
    )

    this.fetchCalculations()
  }

  async createCalculation() {
    await fetch(
      this.calculationsUrl,
      {
        method: 'POST',
        headers: this.requestHeaders,
        body: JSON.stringify({'a': this.state.newA, 'b': this.state.newB})
      }
    )

    this.setState({newA: '', newB: ''})

    this.fetchCalculations()
  }

  async destroyCurrentSession() {
    await fetch(
      `${this.sessionsUrl}/current`,
      {method: 'DELETE', headers: this.requestHeaders}
    )

    this.fetchCalculations()
  }

  render () {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-info float-right mt-2"
          onClick={() => this.destroyCurrentSession()}
        >
          <i className="fa fa-sign-out" />
          &nbsp;
          Sign out
        </button>
        <h1>Calculations</h1>
        <table className="table">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>
                <input
                  className="form-control"
                  value={this.state.newA}
                  onChange={(evt) => this.setState({newA: evt.target.value})}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={this.state.newB}
                  onChange={(evt) => this.setState({newB: evt.target.value})}
                />
              </td>
              <td></td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.createCalculation()}
                >
                  <i className="fa fa-calculator" />
                  &nbsp;
                  Create calculation
                </button>
              </td>
            </tr>
          </tfoot>
          <tbody>
            {this.state.calculations.map(calculation => (
              <tr key={calculation['id']}>
                <td>{calculation['a']}</td>
                <td>{calculation['b']}</td>
                <td>{calculation['answer']}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.destroyCalculation(calculation['id'])}
                  >
                    <i className="fa fa-trash-o" />
                    &nbsp;
                    Delete calculation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default withRouter(CalculationsScreen)
