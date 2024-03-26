import Head from "next/head";
import FormItem from "~/lib/components/FormItem";

const login = (props) => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>{" "}
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="rounded-sm m-5 w-full max-w-[500px] bg-gray-100 p-5">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-picton-blue-500">
                  Login
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please login using your usename and password.
                </p>

                <div className="mt-10 flex flex-col gap-x-6 gap-y-8">
                  <FormItem
                    className=""
                    label="username"
                    type="text"
                    labelName="Username"
                  />
                  <FormItem
                    className=""
                    label="password"
                    type="password"
                    labelName="Password"
                  />
                  
                  <button
                    type="submit"
                    className="sm:col-span-6 rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default login;
