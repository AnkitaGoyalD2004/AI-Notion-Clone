// 'use client';

// import stringToColor from "@/lib/stringToColor";
// import { BlockNoteEditor } from "@blocknote/core";
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/shadcn";
// import "@blocknote/shadcn/style.css";
// import { useRoom, useSelf } from "@liveblocks/react";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import clsx from "clsx";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import * as Y from "yjs";
// import { Button } from "./ui/button";

// type EditorProps = {
//   doc: Y.Doc;
//   provider:LiveblocksYjsProvider; // Use the specific type
//   darkMode: boolean;
// };

// function BlockNote({ doc, provider, darkMode }: EditorProps) {
//   const userInfo = useSelf((me) => me.info);

//   const userCollabInfo = useMemo(() => ({
//       name: userInfo?.name || "Anonymous",
//       color: stringToColor(userInfo?.email || "default"),
//   }), [userInfo]);

//   const editor : BlockNoteEditor = useCreateBlockNote({
//     collaboration: {
//       provider,
//       fragment: doc.getXmlFragment("document-store"),
//       user: userCollabInfo, // Rely on BlockNote to manage this via the provider
//     },
//   });

//   if (!editor) {
//      return <div>Loading editor...</div>;
//   }

//   return (
//     <div>
//       <BlockNoteView
//         className="min-h-screen"
//         editor={editor as any}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </div>
//   );
// }

// function Editor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<LiveblocksYjsProvider>();
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (!room) return;

//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);

//     // --- REMOVE or COMMENT OUT THIS BLOCK ---
//     // This manual setting might conflict with BlockNote's handling
//     /*
//     yProvider.awareness.setLocalStateField("user", {
//       name: "Anonymous",
//       color: "#000000"
//     });
//     */
//     // --- END REMOVE ---


//     setDoc(yDoc);
//     setProvider(yProvider);

//     return () => {
//       yProvider.destroy();
//       yDoc.destroy();
//     };
//   }, [room]);

//   if (!doc || !provider) {
//     return <div className="text-center mt-10">Loading collaborative editor...</div>;
//   }

//   const buttonClass = clsx(
//     "hover:text-white",
//     darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-700 hover:bg-gray-300 hover:text-gray-700" // Corrected hover bg for light mode button
//   );

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <div className="flex items-center gap-2 justify-end mb-10">
//         <Button className={buttonClass} onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
//         </Button>
//       </div>
//       <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
//     </div>
//   );
// }

// export default Editor;
'use client'

import stringToColor from "@/lib/stringToColor";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useRoom, useSelf } from "@liveblocks/react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { Button } from "./ui/button";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
}

function BlockNote({doc, provider, darkMode}: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  
  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name || "Anonymous",
        color: stringToColor(userInfo?.email || "default"),
      }
    }
  });

  if (!editor) return null;

  return (
    <div>
      <BlockNoteView 
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  )
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!room) return;

    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return <div className="text-center mt-10">Loading collaborative editor...</div>;
  }

  const style = `hover : text-white ${
    darkMode 
    ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
    : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700" 
  }` 

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

export default Editor;