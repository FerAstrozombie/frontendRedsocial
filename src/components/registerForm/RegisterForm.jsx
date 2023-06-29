import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const RegisterForm = () => {

    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        confirm: "",
    }

    const registerSchema = Yup.object().shape(
        {
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password to short")
                .required("Password is required"),
            confirm: Yup.string()
                .when("password", {
                    is: value => (value && value.length > 0 ? true : false),
                    then: () => Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Password must match!"
                    )
                }).required("You must confirm the password")
        }
    )

    return (
        <div>
            <h4>Register form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    alert(JSON.stringify(values, null, 2));
                    navigate("/login")  ;                
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" placeholder="example@email.com" />
                        {
                            errors.email && touched.email &&
                            (
                                <ErrorMessage name='email' component="div" />
                            )
                        }

                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        {
                            errors.password && touched.password &&
                            (
                                <ErrorMessage name='password' component="div" />
                            )
                        }

                        <label htmlFor="confirm">Password</label>
                        <Field
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm password"
                            type="password"
                        />
                        {
                            errors.confirm && touched.confirm &&
                            (
                                <ErrorMessage name='confirm' component="div" />
                            )
                        }

                        <button type="submit">Register account</button>
                        {isSubmitting ? (<p>Sending your credentials...</p>) : null}

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm