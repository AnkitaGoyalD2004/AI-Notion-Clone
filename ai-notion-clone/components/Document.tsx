// "use client";

// import { db } from "@/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import { FormEvent, useEffect, useState, useTransition } from "react";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// function Document({ id }: { id: string }) {
//     const [data , loading , error] = useDocumentData(doc(db , 'documents' , id));
//     const [input , setInput] = useState('');
//     const [isUpdating , startTransition] = useTransition();

//     useEffect(() => {
//         if(data){
//             setInput(data.title);
//         }
//     } , [data])

//    const updateTitle = (e : FormEvent) => {
//      e.preventDefault();

//      if(input.trim()){
//         startTransition(async () => {
//             await updateDoc(doc(db, "documents", id), {
//                 title: input,
//             });
//         });
//      }
//    }

//     return (
//         <div>

//             <div className="flex max-w-6xl mx-auto justify-between pb-5">
//                 <form className="flex space-x-2"  onSubmit={updateTitle}>
//                     {/* update title */}
//                     <Input 
//                      value={input}
//                      onChange={(e) => setInput(e.target.value)}/>

//                      <Button disabled={isUpdating} type="submit">
//                      {isUpdating ? "Updating..." : "Update"}
//                      </Button>

//                     {/* IF */}

//                 </form>
//             </div>

//             <div>
//             {/* Manage Users */}

//             {/* Avatars */}
//             </div>

            

//             {/* Collaborative Editor */}
//         </div>
//     )
// }

// export default Document

"use client";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Document({ id }: { id: string }) {
  console.log("Document component rendered with id:", id);

  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  console.log("useDocumentData:", { data, loading, error });

  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (data?.title) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No document found with this ID.</div>;

  return (
    <div>
      <form onSubmit={updateTitle}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter document title"
        />
        <Button disabled={isUpdating} type="submit">
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default Document;



// "use client";

// import { db } from "@/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import { FormEvent, useEffect, useState, useTransition } from "react";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// function Document({ id }: { id: string }) {
//   const [data, loading, error] = useDocumentData(doc(db, "documents", id));
//   const [input, setInput] = useState("");
//   const [isUpdating, startTransition] = useTransition();

//   useEffect(() => {
//     if (data?.title) {
//       setInput(data.title);
//     }
//   }, [data]);

//   const updateTitle = (e: FormEvent) => {
//     e.preventDefault();

//     if (input.trim()) {
//       startTransition(async () => {
//         await updateDoc(doc(db, "documents", id), {
//           title: input,
//         });
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-4 text-center">
//         <p>Loading document...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-4 text-center text-red-600">
//         <p>Error loading document: {error.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex max-w-6xl mx-auto justify-between pb-5">
//         <form className="flex space-x-2" onSubmit={updateTitle}>
//           {/* Update title input */}
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Enter document title"
//           />

//           <Button disabled={isUpdating} type="submit">
//             {isUpdating ? "Updating..." : "Update"}
//           </Button>
//         </form>
//       </div>

//       <div>
//         {/* TODO: Manage Users */}
//         {/* TODO: Avatars */}
//       </div>

//       {/* TODO: Collaborative Editor */}
//     </div>
//   );
// }

// export default Document;



