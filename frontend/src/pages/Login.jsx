import Form from "../components/Form";

function Login() {
    const register = () => {
        window.location.href = "/register";
    }
    return (<div>
                <Form route="/api/token/" method="login" />
                <button onClick={() => register()}>Sign Up</button>
             </div>


    );
}

export default Login;