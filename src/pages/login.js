import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/styles/Login.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup.string().required("Ingrese su clave"),
});

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const userData = await login(data);

      console.log("userData", userData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  // const handleViewArticle = async () => {
  //   try {
  //     const articleData = await Article.getById("1");
  //
  //     console.log("articleData", articleData);
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log("Error", error.message);
  //     }
  //     console.log(error.config);
  //   }
  // };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={register} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={register} />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default withoutAuth(Login);
