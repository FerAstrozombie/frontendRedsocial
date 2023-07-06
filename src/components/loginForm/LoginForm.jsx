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

    const { setToken, setExpiresIn } = useContext(AuthContex);

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
                        navigate("/publicaciones")
                    }
                    if(response.error){
                        alert(JSON.stringify(response) )
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="formLogin">
                        <label htmlFor="email">Email</label>
                        <Field className="input" id="email" type="email" name="email" placeholder="example@email.com"/>
                        {
                            errors.email && touched.email &&
                            (
                                <ErrorMessage name='email' component="div" className="errorLogin"/>
                            )
                        }
                        <label htmlFor="password">Password</label>
                        <Field
                            className="input"
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        {
                            errors.password && touched.password &&
                            (
                                <ErrorMessage name='password' component="div" className="errorLogin"/>
                            )
                        }
                        <button className="boton" type="submit">Login</button>
                        <h4>No tienes una cuenta?...<a href="/register" className="loginLink">Registrate</a></h4>
                        {isSubmitting ? (<p>Logueando...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm