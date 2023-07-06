import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { crearPublicacion } from '../../services/axiosCrudServices';

const loginSchema = Yup.object().shape(
    {
        posteo: Yup.string().required("Ingresa en que estas pensando")
    }
);

const CrearPublicacion = ({token, onAction}) => {
    
    const initialCredentials = {
        posteo: "",
    };

    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    const response = crearPublicacion(values, token);
                    response.then((res) => {  
                        onAction(res.data.newPost.posteo)
                    }).catch((error) => {
                        console.log(error);
                    })    
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <Field id="posteo" type="text" name="posteo" placeholder="En que estas pensando?" />
                        {
                            errors.posteo &&
                            (
                                <ErrorMessage name='posteo' component="div"/>
                            )
                        }
                        <button type="submit">Submit</button>
                        {isSubmitting ? (<p>Posteando...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CrearPublicacion