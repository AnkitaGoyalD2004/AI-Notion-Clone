// "use client"

// import stringToColor from "@/lib/stringToColor";
// import { BlockNoteEditor } from "@blocknote/core";
// // import "@blocknote/core/fonts/inner.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/shadcn";
// import "@blocknote/shadcn/style.css";
// import { useSelf } from "@liveblocks/react";
// import { useRoom } from "@liveblocks/react/suspense";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import * as Y from "yjs";
// import { Button } from "./ui/button";

// type EditorProps = {
//   doc: Y.Doc;
//   provider: any ;
//   darkMode : boolean;
// }

// function BlockNote( {doc , provider , darkMode} : EditorProps){
//   const userInfo = useSelf((me) => me.info);

//   const editor : BlockNoteEditor = useCreateBlockNote({
//     collaboration : {
//       provider , 
//       fragment : doc.getXmlFragment("document-store"),
//       user : {
//         name : userInfo?.name ?? '',
//         color : stringToColor(userInfo?.email ?? ''),
//       }
//     }
//   })
//   return (
//     <div className="relative max-w-6xl mx-auto" >
//       <BlockNoteView 
//       className="min-h-screen"
//       editor={editor}
//       theme={
//         darkMode ? "dark" : "light"
//       }
//       />
//     </div>
//   )
// }

// function Editor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<LiveblocksYjsProvider>();
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);
//     setDoc(yDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.destroy();
//     }
//   }, [room])

//   if(!doc || !provider){
//       return null;    
//   }

//   const style = `hover : text-white ${darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
//     }`

//   return <div className="max-w-6xl mx-auto">
//     <div className="flex items-center gap-2 justify-end mb-10">
//       {/* Translate Document AI */}
//       {/* ChatToDocument AI */}
//       {/* Dark Mode */}
//       <Button className={style} onClick={() => setDarkMode(!darkMode)}>
//         {darkMode ? <SunIcon /> : <MoonIcon />}
//       </Button>
//     </div>
//     {/* BlockNote */}
//     <BlockNote doc={doc} provider={provider} darkMode = {darkMode} />
//   </div>
// }

// export default Editor;


// "use client"

// import stringToColor from "@/lib/stringToColor";
// // Import BlockNoteEditor constructor from core
// import { BlockNoteEditor } from "@blocknote/core";
// // import "@blocknote/core/fonts/inner.css"; // Optional fonts

// // --- CHANGE THIS LINE ---
// // Import BlockNoteView from the shadcn wrapper package
// import { BlockNoteView } from "@blocknote/shadcn";
// // You no longer need useCreateBlockNote imported here if you're using the constructor in useEffect
// // import { useCreateBlockNote } from "@blocknote/react"; // <-- Remove this line

// // Keep the shadcn style
// import "@blocknote/shadcn/style.css";

// import { useSelf } from "@liveblocks/react";
// import { useRoom } from "@liveblocks/react/suspense";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import * as Y from "yjs";
// import { Button } from "./ui/button";

// // ... rest of your Editor component code remains the same as the corrected version ...

// function Editor() {
//   const room = useRoom();
//   const userInfo = useSelf((me) => me.info);

//   // Manage the editor instance in state
//   const [editor, setEditor] = useState<BlockNoteEditor | null>(null);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (!userInfo) {
//       return;
//     }

//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);

//     // Create the editor inside useEffect using the constructor from @blocknote/core
//     const blockNoteEditor = BlockNoteEditor.create({
//        collaboration : {
//           provider: yProvider,
//           fragment : yDoc.getXmlFragment("document-store"),
//           user : {
//             name : userInfo?.name ?? '',
//             color : stringToColor(userInfo?.email ?? ''),
//           }
//         }
//     } );

//     setEditor(blockNoteEditor);

//     return () => {
//       blockNoteEditor.destroy();
//       yDoc?.destroy();
//       yProvider?.destroy();
//     }
//   }, [room, userInfo]);

//   if(!editor){
//       return null;
//   }

//   const style = `hover:text-white ${darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
//     }`

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center gap-2 justify-end mb-10">
//         <Button className={style} onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <SunIcon /> : <MoonIcon />}
//         </Button>
//       </div>
//       <div className="relative">
//         {/* Render BlockNoteView imported from @blocknote/shadcn */}
//         <BlockNoteView
//           className="min-h-screen"
//           editor={editor} // Pass the editor instance from state
//           theme={
//             darkMode ? "dark" : "light"
//           }
//         />
//       </div>
//     </div>
//   );
// }
// export default Editor;

"use client"

import stringToColor from "@/lib/stringToColor";

// Import useCreateBlockNote from @blocknote/react
// (or from @blocknote/shadcn if it re-exports it, but @blocknote/react is standard)
import { useCreateBlockNote } from "@blocknote/react";

// Import BlockNoteView from the shadcn wrapper package
import { BlockNoteView } from "@blocknote/shadcn";

// Styles: shadcn style should be comprehensive.
// Optional core fonts can be included if desired.
// import "@blocknote/core/fonts/inner.css";
import "@blocknote/shadcn/style.css";

import { useSelf } from "@liveblocks/react";
import { useRoom } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as Y from "yjs";
import { Button } from "./ui/button"; // Assuming this path is correct

// Define the type for user information if not already defined elsewhere
interface UserInfo {
  name?: string | null;
  email?: string | null;
  // Add other properties if they exist on userInfo
}

function Editor() {
  const room = useRoom();
  const userInfo = useSelf((me) => me.info as UserInfo | null); // Cast to your UserInfo type

  const [darkMode, setDarkMode] = useState(false);

  // State to hold Yjs document and provider instance
  const [yjsObjects, setYjsObjects] = useState<{
    yDoc: Y.Doc;
    provider: LiveblocksYjsProvider;
  } | null>(null);

  // Effect for setting up and tearing down Yjs
  useEffect(() => {
    // Ensure userInfo and room are loaded
    if (!userInfo || !room) {
      // If yjsObjects exist from a previous setup, clean them up
      if (yjsObjects) {
        yjsObjects.provider.destroy();
        yjsObjects.yDoc.destroy();
        setYjsObjects(null);
      }
      return;
    }

    const yDoc = new Y.Doc();
    const provider = new LiveblocksYjsProvider(room, yDoc);
    setYjsObjects({ yDoc, provider });

    // Cleanup function for Yjs
    return () => {
      provider.destroy();
      yDoc.destroy();
      setYjsObjects(null); // Clear state when dependencies change or component unmounts
    };
  }, [room, userInfo]); // Re-run if room or userInfo changes

  // Memoize editor options to prevent unnecessary re-creations of the editor
  const editorOptions = useMemo(() => {
    if (!yjsObjects || !userInfo) {
      return undefined; // Return undefined if dependencies are not ready
    }

    return {
      collaboration: {
        provider: yjsObjects.provider,
        // We need to Y.XmlFragment here
        fragment: yjsObjects.yDoc.getXmlFragment("document-store"),
        // User information for collaboration
        user: {
          name: userInfo.name ?? "Anonymous",
          color: stringToColor(userInfo.email ?? "anonymous@example.com"),
        },
      },
      // You can add other editor options here:
      // initialContent: [],
      // slashMenuItems: [],
      // ...etc
    };
  }, [yjsObjects, userInfo, stringToColor]); // Add stringToColor if it's not a stable function reference

  // Create the editor instance using the useCreateBlockNote hook
  // The hook handles creation & destruction of the editor.
  const editor = useCreateBlockNote(editorOptions);

  // If the editor or Yjs objects are not yet initialized, show a loading state
  if (!editor || !yjsObjects) {
    // You can customize this loading state
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading editor...
      </div>
    );
  }

  const buttonStyle = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 justify-end mb-6">
        <Button className={buttonStyle} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <div className="relative border rounded-lg shadow-sm overflow-hidden">
        {/* Pass the editor instance to BlockNoteView */}
        <BlockNoteView
          className="min-h-[70vh]" // Adjusted min-height for better visuals
          editor={editor}
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    </div>
  );
}

export default Editor;
