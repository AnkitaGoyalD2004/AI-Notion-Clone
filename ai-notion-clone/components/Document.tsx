// "use client";

// import { db } from "@/firebase";
// import useOwner from "@/lib/useOwner";
// import { doc, updateDoc } from "firebase/firestore";
// import { FormEvent, useEffect, useState, useTransition } from "react";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import DeleteDocument from "./DeleteDocument";
// import Editor from "./Editor";
// import InviteUser from "./InviteUser";
// import ManageUsers from "./ManageUsers";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// function Document({ id }: { id: string }) {
//     const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
//     const [input, setInput] = useState('');
//     const [isUpdating, startTransition] = useTransition();
//     const isOwner = useOwner();

//     useEffect(() => {
//         if (data) {
//             setInput(data.title);
//         }
//     }, [data])

//     const updateTitle = (e: FormEvent) => {
//         e.preventDefault();

//         if (input.trim()) {
//             startTransition(async () => {
//                 await updateDoc(doc(db, "documents", id), {
//                     title: input,
//                 });
//             });
//         }
//     }

//     return (
//         <div className="flex-1 h-full bg-white p-5">

//             <div className="flex max-w-6xl mx-auto justify-between pb-5">
//                 <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
//                     {/* update title */}
//                     <Input
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)} />

//                     <Button disabled={isUpdating} type="submit">
//                         {isUpdating ? "Updating..." : "Update"}
//                     </Button>
//                     {/* IF */}
//                     {isOwner && (
//                         <>
//                             {/* Invite User */}
//                             <InviteUser />
//                             {/* Delete Document */}
//                             <DeleteDocument />
//                         </>
//                     )}
//                 </form>
//             </div>
//             {/* Manage Users */}
//             <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
//                 <ManageUsers />
//             {/* Avatars */}
//             {/* <Avatars/> */}

//             </div>

//             <hr className="pb-10" />

//             {/* Collaborative Editor */}
//             <Editor />
//         </div>
//     )
// }

// export default Document;


"use client";

import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import DeleteDocument from "./DeleteDocument";
import Editor from "./Editor";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();

    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                });
            });
        }
    }

    // --- Add a loading/error state for the document data itself ---
    if (loading) {
        return (
            <div className="flex-1 h-full bg-white p-5 flex items-center justify-center">
                Loading document...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 h-full bg-white p-5 flex items-center justify-center text-red-500">
                Error loading document: {error.message}
            </div>
        );
    }

    if (!data) {
        // This case should ideally be handled by Firebase rules or navigation if ID is invalid
        return (
            <div className="flex-1 h-full bg-white p-5 flex items-center justify-center">
                Document not found.
            </div>
        );
    }


    return (
        <div className="flex-1 h-full bg-white p-5">

            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                    {/* update title */}
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Document Title" // Good to add a placeholder
                        disabled={loading || isUpdating} // Disable input while loading or updating
                    />

                    <Button disabled={isUpdating || loading} type="submit"> {/* Also disable if document data is still loading */}
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                    {isOwner && (
                        <>
                            {/* Invite User - Pass the id */}
                            <InviteUser  />
                            {/* Delete Document - Pass the id */}
                            <DeleteDocument  />
                        </>
                    )}
                </form>
            </div>
            {/* Manage Users - Pass the id */}
            <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
                <ManageUsers />
            {/* Avatars */}
            {/* <Avatars/> */}

            </div>

            <hr className="pb-10" />

            {/* Collaborative Editor - Pass the id (and potentially initial content) */}
            {/* Assuming your 'Editor' component needs the document ID to establish real-time collaboration. */}
            {/* Also, you might want to pass the initial content from 'data' to the editor. */}
            <Editor  /> {/* Assuming 'content' is a field in your document */}
        </div>
    )
}

export default Document;