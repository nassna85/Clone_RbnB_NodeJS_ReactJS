import React, { useState } from 'react';
import Field from "../components/forms/Field";
import TextArea from "../components/forms/TextArea";
import authAPI from "../services/authAPI";

const Registration = ({ history }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        introduction: "",
        description: "",
        avatar: "",
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        introduction: "",
        description: "",
        avatar: "",
        password: "",
        passwordConfirm: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setUser({ ...user, [name]: value });
    };
    /*
    const handleChangeAvatar = event => {
        setUser({ ...user, avatar: event.target.files[0] });
        setAvatarName(event.target.files[0].name);
    };
     */
    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        try{
            /*
            const formData = new FormData();
            formData.append('avatar', user.avatar);
             */
            await authAPI.registration(user);
            setLoading(false);
            setErrors({});
            //Notification user
            history.replace("/connexion");
        }catch(error){
            setLoading(false);
            console.log(error.response);
            const { errors } = error.response.data;
            if(errors){
                const apiErrors = {};
                errors.forEach(error => {
                    apiErrors[error.param] = error.msg;
                });
                setErrors(apiErrors);
            }
        }
    };

    return (
        <section id="form-registration">
            <div className="container">
                <form
                    className="bg-light mx-auto p-4"
                    onSubmit={ handleSubmit }
                    //encType="multipart/form-data"
                >
                    <h3 className="text-center mb-4">
                        <i className="fas fa-user-plus mr-2"></i>
                        Nouvel utilisateur
                    </h3>
                    <Field
                        name="firstName"
                        placeholder="Votre prénom"
                        onChange={ handleChange }
                        value={ user.firstName }
                        error={ errors.firstName }
                    />
                    <Field
                        name="lastName"
                        placeholder="Votre nom"
                        onChange={ handleChange }
                        value={ user.lastName }
                        error={ errors.lastName }
                    />
                    <Field
                        name="email"
                        placeholder="Votre email"
                        onChange={ handleChange }
                        value={ user.email }
                        error={ errors.email }
                    />
                    <Field
                        name="avatar"
                        placeholder="Votre avatar"
                        onChange={ handleChange }
                        value={ user.avatar }
                        error={ errors.avatar }
                    />
                    <Field
                        name="introduction"
                        placeholder="Votre introduction"
                        onChange={ handleChange }
                        value={ user.introduction }
                        error={ errors.introduction }
                    />
                    <TextArea
                        name="description"
                        placeholder="Votre description"
                        onChange={ handleChange }
                        value={ user.description }
                        error={ errors.description }
                    />
                    <Field
                        name="password"
                        placeholder="Votre mot de passe"
                        type="password"
                        onChange={ handleChange }
                        value={ user.password }
                        error={ errors.password }
                    />
                    <Field
                        name="passwordConfirm"
                        placeholder="Confirmer votre mot de passe"
                        type="password"
                        onChange={ handleChange }
                        value={ user.passwordConfirm }
                        error={ errors.passwordConfirm }
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

export default Registration;
