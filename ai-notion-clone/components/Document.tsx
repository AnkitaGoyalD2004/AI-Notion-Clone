"use client";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Document({ id }: { id: string }) {
    const [data , loading , error] = useDocumentData(doc(db , 'documents' , id));
    const [input , setInput] = useState('');
    const [isUpdating , startTransition] = useTransition();

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
        <div>

            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex space-x-2"  onSubmit={updateTitle}>
                    {/* update title */}
                    <Input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}/>

                     <Button disabled={isUpdating} type="submit">
                     {isUpdating ? "Updating..." : "Update"}
                     </Button>

                    {/* IF */}

                </form>
            </div>

            <div>
            {/* Manage Users */}

            {/* Avatars */}
            </div>

            {/* Collaborative Editor */}
        </div>
    )
}

export default Document