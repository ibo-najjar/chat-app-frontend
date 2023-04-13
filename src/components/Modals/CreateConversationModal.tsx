import { useMutation } from "@apollo/client";
import React from "react";
import ConversationOperations from "../../graphql/operations/conversation";
import { useDropzone } from "react-dropzone";
import { Session } from "next-auth";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import UserOperations from "../../graphql/operations/user";
import toast from "react-hot-toast";

interface ICreateConversationModalProps {
  session: Session;
}

const createConversationModal: React.FC<ICreateConversationModalProps> = ({
  session,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  // use dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg , image/jpg , image/gif",
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    maxSize: 5000000, // 5MB
  });

  const [uploadFile] = useMutation<any, any>(
    UserOperations.Mutations.uploadFile,
    {
      onError: (err) => {
        console.log(err);
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          "Apollo-Require-Preflight": "true",
        },
      },
    }
  );

  const [
    createGroupConversation,
    { data, loading: createGroupLoading, error },
  ] = useMutation(ConversationOperations.Mutations.createGroupConversation, {
    onCompleted: (data) => {
      console.log("completed", data);
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const uploadImage = async (groupName: string) => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 5000000) {
      toast.error("File size too large");
      return;
    }
    try {
      const { data } = await uploadFile({
        variables: {
          file,
          fileName: groupName,
        },
      });
      console.log("data", data);
    } catch (error: any) {
      toast.error("Error uploading image " + error?.message);
      console.log("error", error);
    }
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(
      "form submitted",
      e.target.groupName.value,
      e.target.groupDescription.value,
      e.target.groupRadius.value
    );
    try {
      const conversation = await createGroupConversation({
        variables: {
          name: e.target.groupName.value,
          groupRadius: 20,
          adminId: "60f1f1f1f1f1f1f1f1f1f1f1",
          lng: session.user.longitude,
          lat: session.user.latitude,
          bio: e.target.groupDescription.value,
        },
      });
      console.log(
        "groupName",
        conversation.data.createGroupConversation.conversationId
      );
      await uploadImage(
        conversation.data.createGroupConversation.conversationId
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
    setShowModal(false);
  };

  React.useEffect(() => {
    if (!file) return;
    console.log("file", file);
  }, [file]);

  React.useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(file?.preview);
    };
  }, []);

  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Trigger asChild>
        <button className="button w-full" type="button">
          create group
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-20" />
        <Dialog.Content className="fixed inset-0 flex justify-center z-30 rounded-xl shadow-xl w-[90vw] max-w-md h-[400px] bg-neutral-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={onFormSubmit}
            className="container flex flex-col items-center p-4 space-y-2 justify-between"
          >
            <h1 className="text-2xl font-bold">Create new group</h1>
            <div className="flex w-full space-x-3">
              <div className="flex flex-col justify-between pb-5">
                <div>
                  <label htmlFor="groupName" className="font-semibold">
                    Group Name
                  </label>
                  <input
                    type="text"
                    name="groupName"
                    id="groupName"
                    className="bg-neutral-800 focus:outline-none block w-full rounded-md px-3 py-1 mt-1"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="groupRadius" className="font-semibold">
                    Group Radius
                  </label>
                  <select
                    name="groupRadius"
                    id="groupRadius"
                    className="bg-neutral-800 focus:outline-none block w-full rounded-md px-3 py-1 mt-1"
                  >
                    <option value="1">5km</option>
                    <option value="2">10km</option>
                    <option value="3">15km</option>
                    <option value="4">20km</option>
                  </select>
                </div>
              </div>
              <section>
                <div
                  {...getRootProps()}
                  className="border h-36 aspect-video rounded-lg relative border-neutral-700"
                >
                  <input {...getInputProps()} />

                  <Image
                    src={file?.preview ? file?.preview : "/plus.png"}
                    alt="group image"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover rounded-lg"
                    onLoad={() => URL.revokeObjectURL(file?.preview)}
                  />
                </div>
                <p className="text-xs text-neutral-400">
                  this will appear as your group banner
                </p>
              </section>
            </div>
            <div className="w-full">
              <label htmlFor="groupDescription" className="font-semibold">
                Group Description
              </label>
              <textarea
                name="groupDescription"
                id="groupDescription"
                className="bg-neutral-800 focus:outline-none block rounded-md px-3 py-1 mt-1 w-full text-xs text-neutral-400"
                style={{ resize: "none", height: "40px" }}
                maxLength={100} // 100 characters
              />
              <p className="text-xs text-neutral-400">100 characters max</p>
            </div>
            <div className="flex w-full justify-end space-x-2">
              <button
                className="button w-1/2"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="button w-1/2" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default createConversationModal;
