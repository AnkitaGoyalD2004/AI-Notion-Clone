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
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

function Sidebar() {
    const { user } = useUser();
    const [data, loading, error] = useCollection(
        user &&
        query(collectionGroup(db, 'rooms'), where("userId", "==", user.emailAddresses[0].toString()))
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<(
            owner: RoomDocument;
            editor: RoomDocument[]; 
        )>
    }, [data])

    const menuOption = (
        <>
            <NewDocumentButton />
        </>
    )

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg " size={48} />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>
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