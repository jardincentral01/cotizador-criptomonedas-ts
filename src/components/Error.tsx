import { PropsWithChildren } from "react"

function Error({children}: PropsWithChildren) {
    return (
        <div className="rounded-[1rem] bg-rose-500 p-2 text-white text-center font-medium">{children}</div>
    )
}

export default Error
