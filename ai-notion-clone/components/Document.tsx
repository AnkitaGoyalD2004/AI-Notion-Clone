"use client";

import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import DeleteDocument from "./DeleteDocument";
import Editor from "./Editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Document({ id }: { id: string }) {
    const [data , loading , error] = useDocumentData(doc(db , 'documents' , id));
    const [input , setInput] = useState('');
    const [isUpdating , startTransition] = useTransition();
    const isOwner = useOwner();

    useEffect(() => {
        if(data){
            setInput(data.title);
        }
    } , [data])

   const updateTitle = (e : FormEvent) => {
     e.preventDefault();

     if(input.trim()){
        startTransition(async () => {
            await updateDoc(doc(db, "documents", id), {
                title: input,
            });
        });
     }
   }

    return (
        <div className="flex-1 h-full bg-white p-5">

            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2"  onSubmit={updateTitle}>
                    {/* update title */}
                    <Input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}/>

                     <Button disabled={isUpdating} type="submit">
                     {isUpdating ? "Updating..." : "Update"}
                     </Button>
                    {/* IF */}
                    {isOwner && (
                        <>
                        {/* Invite User */}
                        {/* Delete Document */}
                        <DeleteDocument/>
                        </>
                    )}
                </form>
            </div>

            <div>
            {/* Manage Users */}

            {/* Avatars */}
            </div>

            <hr className="pb-10" />

            {/* Collaborative Editor */}
            <Editor/>
        </div>
    )
}

 export default Document
// // src/components/Document.tsx
// "use client";

// import { db } from "@/firebase";
// import { doc } from "firebase/firestore";
// import { FormEvent, useEffect, useState, useTransition } from "react";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import Editor from "./Editor";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// function Document({ id }: { id: string }) {
//     console.count('Render Document component'); // <-- Add this

//     const [data , loading , error] = useDocumentData(doc(db , 'documents' , id));
//     const [input , setInput] = useState('');
//     const [isUpdating , startTransition] = useTransition();

//     useEffect(() => {
//         console.count('Document useEffect: Syncing input with data'); // <-- Add this
//         if(data){
//             setInput(data.title);
//         }
//     }, [data]);

//     const updateTitle = (e : FormEvent) => { /* ... */ };

//     // --- Render Logic ---
//     if (loading) {
//         console.count("Document: Loading data..."); // <-- Add this
//         return <div className="text-center mt-10">Loading document...</div>;
//     }

//     if (error) {
//         console.count("Document: Error loading data"); // <-- Add this
//         return <div className="text-center mt-10 text-red-500">Error loading document: {error.message}</div>;
//     }

//     if (!data) {
//          console.count("Document: Data not found"); // <-- Add this
//          return <div className="text-center mt-10">Document not found.</div>;
//     }

//     console.count("Document: Data loaded, rendering main content."); // <-- Add this

//     return (
//         <div className="max-w-6xl mx-auto px-4">
//             <div className="flex justify-between pb-5">
//                 <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
//                     <Input
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                     />
//                     <Button disabled={isUpdating} type="submit">
//                         {isUpdating ? "Updating..." : "Update"}
//                     </Button>
//                 </form>
//             </div>

//             <div>
//                 {/* Manage Users / Avatars area */}
//             </div>

//             <hr className="pb-10" />

//             {/* Render the Collaborative Editor ONLY when data is loaded */}
//             <Editor /> {/* This should now only render after loading */}
//         </div>
//     );
// }

// export default Document;