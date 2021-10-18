import ProfileService from "../../../Data/Services/ProfileService";
import "./Login.scss";

export default function Login() {
  const { getProfile, updateProfile } = ProfileService();
  return <>
    <div className="login">Login in my page</div>
  </>
}
