import React, {Suspense, useEffect, useRef, useState, memo, useCallback, useMemo} from 'react';
import useDebounce from "./useDebounce";
import ViewItems from "./ListItemd";

const REACT_APP_DATA_URL = "https://picsum.photos/v2/list?page=2&limit=100";

const fetchData = async (REACT_APP_DATA_URL: string) => {
    const response = await fetch(REACT_APP_DATA_URL);
    try {
        if (!response.ok) {
            throw Error(response.statusText);
        }
    } catch (err) {
        console.error(err);
    }
    const data = await response.json();

    return data;
}

interface ViewItemsProps {
    onMouseEnter?: () => void
}

const App = memo(() => {
    let MAGIC_NUMBER = 5;
    const [data, setData] = useState<Array<any>>();
    const [columns, setColumns] = useState<number>(MAGIC_NUMBER);
    const [currentItems, setCurrentItems] = useState<Array<Object>>([]);
    const [initialSliceNumber, setInitialSliceNumber] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const container = useRef(null);
    const NUM = window.innerWidth / 5;

    useEffect(() => {
        try {
            fetchData(REACT_APP_DATA_URL).then(data => {
                setData(data)
            });
        } catch (error) {
            console.log(error);
        }
        if (!data) {
            return;
        }

    }, []);

    useEffect(() => {
        let arrBefore = new Array(5).fill(null);
        let arrAfter = new Array(5).fill(null);
        if (data) {
            setCurrentItems([...data.slice(initialSliceNumber, columns)])
        }
    }, [data, initialSliceNumber]);

    useEffect(() => {
        const observerConfig = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }
        const myObserver = new IntersectionObserver((entry) => {
            entry.forEach(el => {
                el.isIntersecting ? MAGIC_NUMBER = MAGIC_NUMBER + 1 : MAGIC_NUMBER = MAGIC_NUMBER - 1
            })
        }, observerConfig)

        if (container.current) {
            console.log('enter observer')
            container?.current?.querySelectorAll('.observed').forEach((item: Element) => {
                myObserver.observe(item)
            })
        }


    }, [width, initialSliceNumber]);


    const handleScroll = useCallback(useDebounce((e: any) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setWidth(width - NUM);
            setInitialSliceNumber(initialSliceNumber + 1)
            setColumns(columns + 1)
        } else if (e.deltaY > 0) {
            setInitialSliceNumber(initialSliceNumber - 1)
            setColumns(columns - 1)
            setWidth(width + NUM);
        }
    }, 100), [width, initialSliceNumber])

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <ViewItems width={width} NUM={NUM} container={container} currentItems={currentItems} wheelEvent={handleScroll}/>
        </Suspense>
    )
})


export default App


