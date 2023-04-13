import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Header />
      {/* mobile devices extra space */}
      {/* <div className="h-40 md:hidden" /> */}
    </>
  );
};

// <div className="flex flex-col min-h-screen max-h-screen items-center">
//   <Header session={session as Session} />
//   <div className="flex-1 flex max-w-7xl mx-auto w-full">{children}</div>
// </div>
export default Layout;
