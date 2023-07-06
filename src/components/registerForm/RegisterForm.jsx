import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../../models/user.class.js";
import { createUser } from "../../services/axiosCrudServices.js";


const RegisterForm = () => {

    let user = new User;

    const navigate = useNavigate();

    const initialValues = {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        confirm: "",
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const registerSchema = Yup.object().shape(
        {
            nombre: Yup.string()
                .min(4, "Nombre demsiado corto")
                .required("El nombre es requerido"),
            apellido: Yup.string()
                .min(4, "Nombre demsiado corto")
                .required("El nombre es requerido"),
            telefono: Yup.string()
                .required("El telefono es requerido")
                .matches(phoneRegExp, 'El numero de telefono es invalido')
                .min(10, "Nro de telefono demasiado corto")
                .max(10, "Nro de telefono demasiado largo"),
            email: Yup.string()
                .email("Formato invalido de email")
                .required("El email es requerido"),
            password: Yup.string()
                .min(6, "Contraseña muy corta")
                .required("La contraseña es requerida"),
            confirm: Yup.string()
                .when("password", {
                    is: value => (value && value.length > 0 ? true : false),
                    then: () => Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Las constraseñas deben coincidir!"
                    )
                }).required("Tienes que confirmar tu contraseña")
        }
    )

    return (
        <div>
            <h4>Register form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={async (values) => {
                    user.nombre = values.nombre;
                    user.apellido = values.apellido;
                    user.telefono = values.telefono;
                    user.email = values.email;
                    user.password = values.password;
                    user.repassword = values.password;
                    const response = await createUser(user.nombre, user.apellido, user.telefono, user.email, user.password, user.repassword);
                    if (response.status === 400) alert(JSON.stringify(response.data))
                    navigate("/login");
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="formLogin">
                        <div className="registro">
                            <div className="inputField">
                                <label htmlFor="nombre">Nombre</label>
                                <Field id="nombre" type="text" name="nombre" placeholder="Nombre" className="input" />
                                {
                                    errors.nombre && touched.nombre &&
                                    (
                                        <ErrorMessage name='nombre' component="div" className="error" />
                                    )
                                }
                            </div>
                            <div className="inputField">
                                <label htmlFor="apellido">Apellido</label>
                                <Field id="apellido" type="text" name="apellido" placeholder="Apellido" className="input" />
                                {
                                    errors.apellido && touched.apellido &&
                                    (
                                        <ErrorMessage name='apellido' component="div" className="error" />
                                    )
                                }
                            </div>
                        </div>

                        <div className="registro">
                            <div className="inputField">
                                <label htmlFor="telefono">Telefono</label>
                                <Field id="telefono" type="phone" name="telefono" placeholder="Telefono" className="input" />
                                {
                                    errors.telefono && touched.telefono &&
                                    (
                                        <ErrorMessage name='telefono' component="div" className="error" />
                                    )
                                }
                            </div>
                            <div className="inputField">
                                <label htmlFor="email">Email</label>
                                <Field id="email" type="email" name="email" placeholder="example@email.com" className="input" />
                                {
                                    errors.email && touched.email &&
                                    (
                                        <ErrorMessage name='email' component="div" className="error" />
                                    )
                                }
                            </div>
                        </div>        

                        <div className="registro">
                            <div className="inputField">
                                <label htmlFor="password">Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    className="input"
                                />
                                {
                                    errors.password && touched.password &&
                                    (
                                        <ErrorMessage name='password' component="div" className="error" />
                                    )
                                }
                            </div>
                            <div className="inputField">
                                <label htmlFor="confirm">Password</label>
                                <Field
                                    id="confirm"
                                    name="confirm"
                                    placeholder="Confirm password"
                                    type="password"
                                    className="input"
                                />
                                {
                                    errors.confirm && touched.confirm &&
                                    (
                                        <ErrorMessage name='confirm' component="div" className="error" />
                                    )
                                }
                            </div>
                        </div>

                        <button type="submit" className="boton">Registrarme </button>
                        <h4>Ya tienes una cuenta?...<a href="/login" className="loginLink">Logueate</a></h4>
                        {isSubmitting ? (<p>Registrandote...</p>) : null}

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm