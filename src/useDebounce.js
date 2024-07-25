import {useEffect, useState} from "react";


const useDebounce = (fn, delay) => {
	const [timeoutRef, setTimeoutRef] = useState(null);

	useEffect(() => {
		return () => clearTimeout(timeoutRef);
	}, [timeoutRef]);

	const debouncedFunction = (...args) => {
		clearTimeout(timeoutRef);
		setTimeoutRef(setTimeout(() => fn(...args), delay));
	};

	return debouncedFunction;
}

export default useDebounce;