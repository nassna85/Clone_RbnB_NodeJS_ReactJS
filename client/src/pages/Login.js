import React, {useContext, useState} from 'react';
import Field from "../components/forms/Field";
import AuthAPI from "../services/authAPI";
import {toast} from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const Login = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        try{
            await AuthAPI.login(credentials);
            setLoading(false);
            setErrors("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté(e)");
            history.replace("/");
        }catch(error){
            console.log(error.response);
            setLoading(false);
            const { errors } = error.response.data;
            if(errors){
                setErrors("Email ou mot de passe incorrect !");
            }else{
                toast.error("Une erreur est survenue. Veuillez rééssayer plus tard.");
            }

        }
    };

    return (
        <section id="form-login">
            <div className="container">
                <form
                    className="bg-light mx-auto p-4"
                    onSubmit={ handleSubmit }
                >
                    <h3 className="text-center mb-4">
                        <i className="fas fa-user mr-2"></i>
                        Connectez-vous
                    </h3>
                    {
                        errors &&
                        <div className="alert alert-danger text-center">
                            { errors }
                        </div>
                    }
                    <Field
                        name="email"
                        placeholder="Adresse Email"
                        onChange={ handleChange }
                        error={ errors.email }
                        value={ credentials.email }
                    />
                    <Field
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                        onChange={ handleChange }
                        error={ errors.password }
                        value={ credentials.password }
                    />
                    <div className="form-group">
                        <button
                            className={"btn btn-danger" + (loading ? " py-2 px-5" : "")}
                        >
                            {
                                loading ? <i className='fas fa-spinner fa-pulse'></i> : "Je m'inscris"
                            }

                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
