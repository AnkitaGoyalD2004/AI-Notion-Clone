'use client'
import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";

function RoomsProvider({roomId , children} : {
    roomId : string , 
    children : React.ReactNode;
}) {
  return (
    <RoomProviderWrapper
    id={roomId} 
    initialPresence={{
        cursor: null 
    }}
    >
        <ClientSideSuspense fallback={<LoadingSpinner/>}>
            {children}
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}

export default RoomsProvider