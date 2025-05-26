import RoomsProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function DocLayout({children , params : {id}}: {children : React.ReactNode , params : {id: string};}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return (
     <RoomsProvider roomId = {id} >{children}</RoomsProvider>
    //  <div>{children}</div>
  )
}

export default DocLayout