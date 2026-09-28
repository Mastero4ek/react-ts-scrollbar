import { useEffect, useState } from 'react'

export const useFakeLoading = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fakeLoading = () => {
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
	}

	useEffect(() => {
		fakeLoading()
	}, [])

	return { isLoading, fakeLoading }
}
