import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function Post(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { sessionClaims } = await auth();
    const { room } = await req.json();

    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo: {
            name: sessionClaims?.fullName!,
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,
        }
    })
    
    const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId" , '==' , sessionClaims?.email)
    .get();

    const userInRooms = usersInRoom.docs.find((doc) => doc.id === room);

    if(userInRooms?.exists){
        session.allow(room , session.FULL_ACCESS);
        const {body , status} = await session.authorize();

        return new Response(body , {status});
    }
}