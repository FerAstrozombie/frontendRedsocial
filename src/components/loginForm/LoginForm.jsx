import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { User } from "../../models/user.class.js";
import { login } from "../../services/axiosCrudServices.js";
import { useContext } from "react";
import AuthContex from "../../context/AuthContext.jsx";

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().min(6, "Password to short").required("Password is required")
    }
)

const LoginForm = () => {
    
    const navigate = useNavigate();

    const { token, setToken, setExpiresIn, expiresIn } = useContext(AuthContex);

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
                    await new Promise((r) => setTimeout(r, 2000));
                    user.email = values.email;
                    user.password = values.password;
                    user.repassword = values.password;
                    const response = await login(user.email, user.password, user.repassword);
                    if(response.status === 200){
                        setToken(response.data.token);
                        setExpiresIn(response.data.expiresIn);
                        console.log(token, expiresIn);
                        navigate("/publicaciones")
                    }
                    if(response.error){
                        alert(JSON.stringify(response) )
                    }
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
                        <h4>No tienes una cuenta?...<a href="/register">Registrarme</a></h4>
                        {isSubmitting ? (<p>Logueando...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm