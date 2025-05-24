'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOthers, useSelf } from "@liveblocks/react/suspense";


function Avatars() {
    const others = useOthers();
    const self = useSelf();

    const all = [self, ...others];
    return (
        <div className="flex gap-2 items-center">
            <p className="font-light text-sm">Users currently editing this page</p>

            <div className="flex -space-x-5">
                {all.map((other, i) => (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>Hover</TooltipTrigger>
                            <TooltipContent>
                                <p>Add to library</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>

        </div>
    )
}
export default Avatars