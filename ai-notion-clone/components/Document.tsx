"use client";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Document({ id }: { id: string }) {
    const [input , setInput] = useState('');
    const [isUpdating , startTransition] = useTransition();

   const updateTitle = (e : FormEvent) => {
     e.preventDefault();

     if(input.trim()){
        startTransition(async () => {
            await updateDoc(doc(db, "documents", id), {
                title: input.trim()
            });
        });
     }
   }

    return (
        <div>

            <div>
                <form onSubmit={updateTitle}>
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