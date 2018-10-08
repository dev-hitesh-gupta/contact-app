import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from "react-redux";
import { apiCall } from '../actions';
import { bindActionCreators } from "redux";
import store from '../reducers';
import actionTypes from '../actions/types';




class Table extends React.Component {



    actionFormatter = (cell, row) => {
        return (
            <div>
                <Button
                    key="edit"
                    color="primary"
                    onClick={() => {
                        store.dispatch({
                            type: actionTypes.EDIT_USER,
                            payload: row
                        })
                    }}
                > Edit
                </Button>
                <Button
                    key="delete"
                    color="danger"
                    onClick={() => {
                        this.props.apiCall({
                            method: 'delete',
                            id: row.id
                        });
                    }}
                > Delete
                </Button>
            </div>);

    }

    render() {
        const columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true
        }, {
            dataField: 'name',
            text: 'Name',
            sort: true
        }, {
            dataField: 'email',
            text: 'Email ',
            sort: true
        }, {
            dataField: 'phone',
            text: 'Phone'
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: this.actionFormatter
        }];

        return (
            <BootstrapTable keyField='id' data={this.props.users} columns={columns} />
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.postError) {
            console.log(this.props.postError);
        }
        if (this.props.postSuccess && this.props.postSuccess != prevProps.postSuccess) {
            this.props.apiCall({})
        }
    }



    componentDidMount() {
        this.props.apiCall({})
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loading: state.isLoading,
        postSuccess: state.postSuccess,
        postError: state.postError
    };
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ apiCall }, dispatch);
}
//const Table = () => <BootstrapTable keyField='email' data={ data.rows } columns={ columns } />
export default connect(mapStateToProps, mapDispatchToProps)(Table);
