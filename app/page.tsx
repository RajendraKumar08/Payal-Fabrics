import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Homepage = async () => {

  const { isAuthenticated, getUser } = getKindeServerSession();

  const authenticated = await isAuthenticated();
  const user = await getUser();
  console.log(user)
  return (
    <>
      <nav className="flex justify-between bg-[pink] items-center py-3 px-3">
        <h1 className="text-3xl font-bold">Payal Fabrics</h1>

        <ul className="flex gap-3 font-bold items-center">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/">Products</Link>
          </li>

          <li>
            <Link href="/">Contact us</Link>
          </li>

          {
            !authenticated ? (
              <>
                <li>
                  <RegisterLink>Register</RegisterLink>
                </li>

                <li>
                  <LoginLink>Login</LoginLink>
                </li>
              </>
            ) : (
              <>
                <li>{user?.given_name}</li>

                <li>
                  <LogoutLink>Logout</LogoutLink>
                </li>
              </>
            )
          }
        </ul>
      </nav>
      {/* {
        if(user.role == USER){
          return (
            <div>

  </div>

  <div className="border-t border-[#352042] mt-8 pt-5 text-center text-[#B8A9C3] text-sm">
    © 2026 Payal Fabrics. All rights reserved.
  </div>
</footer>
    </>
  );
};

export default Homepage;