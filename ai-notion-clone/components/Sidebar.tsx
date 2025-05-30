"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

function Sidebar() {
    const { user } = useUser();

    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    })

    const [data, loading, error] = useCollection(
        user &&
        query(collectionGroup(db, 'rooms'), where("userId", "==", user.emailAddresses[0].toString()))
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;

                if (roomData.role === "owner") {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData,
                    })
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData,
                    })
                }
                return acc;
            }, {
            owner: [],
            editor: [],
        }
        )

        setGroupedData(grouped);

    }, [data])

    const menuOption = (
        <>
            <NewDocumentButton />

            {/* My Document */}
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        No Document Found
                    </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">
                            My Documents
                        </h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOption key={doc.id} id={doc.roomId} href={`/doc/${doc.roomId}`} />
                        ))}
                    </>
                )}
           

            {/* Shared with Me */}
            {groupedData.editor.length > 0 && (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm">
                        Shared With Me
                    </h2>
                    {groupedData.editor.map((doc) => (
                        <SidebarOption key={doc.id} id={doc.roomId} href={`/doc/${doc.roomId}`} />
                    ))}
                </>
            )}
             </div>
        </>
    )

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg " size={40} />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle className="flex flex-col items-center">Menu</SheetTitle>
                            <div className="flex flex-col items-center">
                                {menuOption}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:inline">
                {menuOption}
            </div>
        </div>
    )
}

export default Sidebar