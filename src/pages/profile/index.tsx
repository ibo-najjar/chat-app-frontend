import DropZone from "@/src/components/InputFields/DropZone";
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../../graphql/operations/user";

const defaultValues = {
  userName: "",
  image: null,
  bio: "",
};

const Profile = () => {
  const { data: session, status } = useSession();
  const [values, setValues] = useState(defaultValues);

  const router = useRouter();

  const userId = session?.user?.id;

  const [uploadFile] = useMutation<any, any>(
    UserOperations.Mutations.uploadFile,
    {
      onError: (err) => {
        console.log(err);
      },
      variables: {
        file: values.image,
        fileName: session?.user?.id,
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          "Apollo-Require-Preflight": "true",
        },
      },
    }
  );

  const [updateUser] = useMutation<any, any>(
    UserOperations.Mutations.updateUserInformation,
    {
      onError: (err) => {
        console.log(err);
      },
      onCompleted: (data) => {
        console.log(data);
        if (data.updateUserInformation.success) {
          toast.success("Profile updated successfully");
          // go to previous page
          router.back();
        } else {
          //toast.error(data.updateUserInformation.error);
        }
      },
    }
  );

  useEffect(() => {
    if (session) {
      setValues((prev) => ({
        ...prev,
        userName: session.user.username,
      }));
    }
  }, [session]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  // const handleImageChange = (e: any) => {
  //   setValues((prev) => ({
  //     ...prev,
  //     image: e.target.files,
  //   }));
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!values.userName) {
        throw new Error("Username is required");
      }

      const { data } = await uploadFile({
        variables: {
          file: values.image ? values.image : null,
        },
      });

      const imageUrl = data.uploadFile.url;

      if (values.userName) {
        await updateUser({
          variables: {
            username: values.userName,
            bio: values.bio,
            imageUrl: imageUrl,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <form
        className="w-full max-w-lg bg-secondary rounded-xl py-6 px-3 space-y-5 relative pt-24"
        onSubmit={handleSubmit}
      >
        <DropZone
          setValues={setValues}
          className="absolute -top-24 left-10"
          userId={userId}
        />

        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="w-full bg-primary rounded-xl py-3 px-3  text-neutral-400 outline-none focus:ring-0 text-xl"
          value={values.userName}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              userName: e.target.value,
            }));
          }}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          className="w-full bg-primary rounded-xl py-3 px-3  text-neutral-400
            outline-none focus:ring-0 text-xl
          "
          value={values.bio}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              bio: e.target.value,
            }));
          }}
        />
        <div className="w-full flex justify-center">
          <button className="button bg-accent" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
