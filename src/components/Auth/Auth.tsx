import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperation from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/src/util/types";
import { toast } from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { GiDialPadlock } from "react-icons/gi";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperation.Mutations.createUsername);

  //console.log(data, loading, error);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({
        variables: { username },
      });
      //console.log(data);
      if (!data?.createUsername) {
        throw new Error("Error creating username");
      }
      if (!data?.createUsername?.success) {
        const { error } = data?.createUsername;
        toast.error(data?.createUsername?.error, {
          style: {
            color: "#1d1d1d",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#1d1d1d",
          },
        });

        throw new Error(error);
      }
      //console.log("success");
      reloadSession();
    } catch (e) {
      console.log("onSumbit error", e);
    }
  };
  //console.log("session", session);
  return (
    <div className="flex justify-center items-center flex-col space-y-5 mx-auto">
      {session ? (
        <>
          <div className="center flex-col space-y-2">
            <h1 className="text-3xl font-medium">Create Username</h1>
            <div className=" text-ptext center space-x-1 px-5 text-center leading-5">
              <p>
                You will only neeed to create a username once you can change it
                anytime.
              </p>
            </div>
          </div>
          <input
            type="text"
            value={username}
            className="outline-none button"
            placeholder=""
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button onClick={onSubmit} className="button">
            Save
          </button>
        </>
      ) : (
        <>
          <div className="center flex-col">
            <h1 className="text-3xl font-medium">Choose a way to Sign-In</h1>
          </div>
          <button
            onClick={() => {
              signIn();
            }}
            className="button flex space-x-2"
          >
            <AiOutlineGoogle className="inline-block text-2xl " />
            <h1>Sign In with google</h1>
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
