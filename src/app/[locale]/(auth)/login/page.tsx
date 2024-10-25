import LoginForm from "@/components/C-UI/Auth/Login/LoginForm"
import { redirect } from "@/navigation";
import { cookies } from "next/headers";


const LoginPage = () => {

  const token = cookies().get("jwtToken")?.value;

  if (token) redirect("/");



  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center pt-40">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Log In</h1>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage