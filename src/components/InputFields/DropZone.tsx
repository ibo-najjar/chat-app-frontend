import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  setValues: any;
  className?: string;
  userId: string | undefined;
}

const DropZone: React.FC<DropZoneProps> = ({
  setValues,
  className,
  userId,
}) => {
  const [preview, setPreview] = useState<any>(null);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/png, image/jpeg",
  });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 100,
    height: "180px",
    width: "180px",
    borderColor: "#000000",
    borderStyle: "dashed",
    backgroundColor: "#111111",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // change later
    backgroundImage: `url(${
      preview ? preview : `http://localhost:4000/images/${userId}.png`
    })`,
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    console.log(acceptedFiles);
    setValues((prev: any) => ({
      ...prev,
      image: acceptedFiles[0],
    }));
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <section className={className}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drop or click here</p>
      </div>
    </section>
  );
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default DropZone;
