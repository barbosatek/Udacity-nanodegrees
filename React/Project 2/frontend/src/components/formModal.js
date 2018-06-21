import React, { Component } from 'react';
import { connect } from 'react-redux'

class FormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: this.props.form,
            onSubmit: this.props.onSubmit,
            editableFields: this.props.editableFields
        }

        this.handlePropertyChange = this.handlePropertyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePropertyChange(value, propertyName) {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [propertyName]: value
            }
        }));
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.form)
        .then((updatedForm) => {
            this.setState((state, props) => {
                return {form: updatedForm};
            })
        })
    }
    
  render() {
    return (
        <div className="modal fade" id={`modal-${this.state.form.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.props.title}
                        </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {Object.keys(this.state.form).map((key, index) =>
                                {
                                    return this.state.editableFields.includes(key) && <div className="form-group" key={key}>
                                            <label htmlFor={`${key}`}>{this.capitalize(key)}</label>
                                            <input onChange={(e) => { this.handlePropertyChange(e.target.value, key) }}
                                                type="test" className="form-control"
                                                id={`${key}`}
                                                value={this.state.form[key]} />
                                        </div>
                                }
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
    return {
    }
  }

function mapStateToProps(store) {
  return {
      store: {
        ...store
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
