import LiveBlocksProvider from "@/components/LiveBlockProvider"

function PageLayout({children} : {
    children : React.ReactNode
}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}

export default PageLayout