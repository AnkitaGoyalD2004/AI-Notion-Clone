"use client";
import { usePathname } from "next/navigation";

function Breadcrumbs() {
    const path = usePathname();

    const segments = path.split("/");
    console.log(segments);

  return (
    <div>Breadcrumbs</div>
  )
}

export default Breadcrumbs