import React from "react"
import PropTypes from "prop-types"

class CalculationsScreen extends React.Component {
  baseUrl = '/api/v1/calculations'
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
      await fetch(this.baseUrl, {headers: this.requestHeaders})

    if (response.status == 200) {
      let calculations = await response.json()
      this.setState({calculations: calculations})
    } else {
    }
  }

  async destroyCalculation(calculationId) {
    await
      fetch(
        `${this.baseUrl}/${calculationId}`,
        {method: 'DELETE', headers: this.requestHeaders}
      )

    this.fetchCalculations()
  }

  async createCalculation() {
    await
      fetch(
        this.baseUrl,
        {
          method: 'POST',
          headers: this.requestHeaders,
          body: JSON.stringify({'a': this.state.newA, 'b': this.state.newB})
        }
      )

    this.setState({newA: '', newB: ''})

    this.fetchCalculations()
  }

  render () {
    return (
      <React.Fragment>
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
                  onClick={
                    () => this.createCalculation()
                  }
                >
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
                    onClick={
                      () => this.destroyCalculation(calculation['id'])
                    }
                  >
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

export default CalculationsScreen
