import { type FormEvent, useState } from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", { ...data, callbackUrl: "/admin"});
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="m-5 w-full max-w-[500px] rounded-sm bg-white shadow p-5">
          <form onSubmit={loginUser}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-picton-blue-500">
                  Login
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please login using your usename and password. If you don&apos;t have a login, please ask the admin to create one for you.
                </p>

                <div className="mt-10 flex flex-col gap-x-6 gap-y-8">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        autoComplete="username"
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                        value={data.username}
                        type="text"
                        id="username"
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        value={data.password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-6"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
