import React from 'react';
import './Calculator.css';

class FormLabel extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
    );
  }
}

class Calculator extends React.Component {
  
  constructor() {
    super();

    this.state = {
      loan_amount : 100000,
      interest_rate : 3.92,
      loan_period : 30,
      monthly_payment :0,
    }
  }



  handleChange = (e) => {
    let newState = {};

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  }

  handleSubmit = (e, message) => {
    e.preventDefault();

    let formData = {
      la : this.state.loan_amount,
      ir : this.state.interest_rate / 100 / 12,
      lp : this.state.loan_period * 12,
    };

    this.setState({monthly_payment : calculatePayment(formData.la, formData.ir, formData.lp).toFixed(2)});

  }


  render() {
    return (
      <form className="mortgage-form" onSubmit={this.handleSubmit}>
        <h1>Mortgage Calculator</h1>

        <fieldset className="form-group">
          <FormLabel htmlFor="loanAmount" title="Loan Amount:" />
          <input id="loanAmount" className="form-input" name="loan_amount" type="text" onChange={this.handleChange} value={this.state.loan_amount} />
        </fieldset>

        <fieldset className="form-group">
          <FormLabel htmlFor="interestRate" title="Interest Rate: " />
          <input id="interestRate" className="form-input" name="interest_rate" type="text" onChange={this.handleChange} value={this.state.interest_rate} />
        </fieldset>

        <fieldset className="form-group">
          <FormLabel htmlFor="loanPeriod" title="Loan Period: " />
          <input id="loanPeriod" className="form-input" name="loan_period" type="text" onChange={this.handleChange} value={this.state.loan_period} />
        </fieldset>

        <div className="monthlyPayment">
          <span className="mpText">Monthly Payment</span>
          <span className="mpAmount">${this.state.monthly_payment}</span>
        </div>

        <div className='form-group'>
          <input id='formButton' className='btn' type='submit' placeholder='Submit' />
        </div>
      </form>
    );
  }

}

function calculatePayment(la, ir, lp) {
    return (la * ir * (Math.pow(1 + ir, lp)) / (Math.pow(1 + ir, lp) - 1));
  }

export default Calculator;


