import { type FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Layout from "~/lib/components/Layout";
import type { GetStaticPropsContext } from "next";
import Router from "next/router";
import { useRecaptcha } from "~/lib/hooks/useRecaptcha";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [failedLogin, setFailedLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { requestToken } = useRecaptcha();

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailedLogin(false);
    setLoading(true);

    const token = await requestToken("admin_login");

    if (!token) {
      setFailedLogin(true);
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/admin",
      recaptchaToken: token,
    });

    if (res?.error) {
      setFailedLogin(true);
      setData((prev) => ({ ...prev, password: "" }));
    } else if (res?.ok) {
      setFailedLogin(false);
      void Router.replace("/admin");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="m-5 w-full max-w-[500px] rounded-sm bg-white p-5 shadow">
          <form onSubmit={loginUser}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-picton-blue-500">
                  Login
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Please login using your username and password. If you
                  don&apos;t have a login, please ask the admin to create one
                  for you.
                </p>
                <p
                  className={`mt-2 text-sm leading-6 text-red-500 ${failedLogin ? "block" : "hidden"}`}
                >
                  The username, password, or reCAPTCHA was invalid. Please try again.
                </p>

                <div className="mt-6 flex flex-col gap-x-6 gap-y-8">
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
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
                        required
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
                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-6"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}

export default Login;
