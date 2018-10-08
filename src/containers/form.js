import React from 'react';
import { Formik } from 'formik';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { connect } from "react-redux";
import { apiCall } from '../actions';
//import {actionTypes} from '../actions';
import { bindActionCreators } from "redux";
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phone: Yup.number()
        .required('Required'),
});

class Basic extends React.Component {

    render() {
        let initialValues = { email: '', password: '', name: '', phone: '' };
        if (this.props.user) {
            //console.log(this.props);
            let { email, password, name, phone } = this.props.user;
            initialValues = { email, password, name, phone };
        }
        //console.log(initialValues);
        return (<Formik
            initialValues={initialValues}
            validationSchema={UserSchema}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                //console.log(this.props.user);
                let request = { method: 'post', user: values };
                if (this.props.user) {
                    this.props.apiCall({
                        ...request,
                        method: 'put',
                        id: this.props.user.id
                    })
                    setSubmitting(false);
                    resetForm(initialValues);
                    return;
                }
                this.props.apiCall(request);
                setSubmitting(false);
                resetForm(initialValues);
                return;
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm
            }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <strong>Company</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && errors.email}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password && errors.password}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {errors.name && touched.name && errors.name}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        type="phone"
                                        name="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                    />
                                    {errors.phone && touched.phone && errors.phone}
                                </FormGroup>
                                <Button type="submit" disabled={isSubmitting}>
                                    Submit
                            </Button>
                            </CardBody>
                        </Card>
                    </Form>
                )
            }}
        </Formik>)
    }
}

const mapStateToProps = ({user}) => {
    return {
        user
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ apiCall }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Basic);