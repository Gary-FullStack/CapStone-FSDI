// thos hook adds a loacation title for each page

import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => document.title = prevTitle
    }, [title])

}

export default useTitle