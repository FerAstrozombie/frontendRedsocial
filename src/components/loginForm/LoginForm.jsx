import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { User } from "../../models/user.class.js";
import { login } from "../../services/axiosCrudServices.js";

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required")
    }
)

const LoginForm = ({setToken}) => {
    
    const navigate = useNavigate();

    let user = new User;

    const initialCredentials = {
        email: "",
        password: ""
    };

    return (
        <div>
            <h4>Login form</h4>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    user.email = values.email;
                    user.password = values.password;
                    user.repassword = values.password;
                    const response = await login(user.email, user.password, user.repassword);
                    const data =JSON.stringify(response.data.token);
                    setToken = {data}
                    navigate("/profile")
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" placeholder="example@email.com" />
                        {
                            errors.email && touched.email &&
                            (
                                <ErrorMessage name='email' component="div"/>
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
                                <ErrorMessage name='password' component="div"/>
                            )
                        }
                        <button type="submit">Submit</button>
                        {isSubmitting ? (<p>Login your credentials...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm