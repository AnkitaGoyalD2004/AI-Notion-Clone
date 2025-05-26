'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import LiveCursorProvider from "./LiveCursorProvider";
import LoadingSpinner from "./LoadingSpinner";


function RoomsProvider({ roomId, children }: {
    roomId: string,
    children: React.ReactNode;
}) {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null
            }}
        >
            <ClientSideSuspense fallback={<LoadingSpinner />}>
                <LiveCursorProvider>
                    {children}
                </LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProvider>
        // <div >{children}</div>
    )
}
export default RoomsProvider;
