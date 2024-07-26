import React, {memo, useEffect, useMemo} from "react";

const ViewItems = memo(({width, NUM, container, currentItems, wheelEvent}) => {

    const Container = useMemo(() => ({
        'position': 'relative',
        'left': `${50}%`,
        'transform': 'translateX(-50%)',
        'display': 'flex',
        'justifyContent': 'center',
        'gridTemplateColumns': 'repeat(5, 1fr)',
        'gridGap': ' 10px',
        'margin': ' 0 auto',
        'transition': 'all 3s',

    }), [width]);

    const Item = useMemo(() => ({
        'width': `${NUM}px`,
        'height': `100%`,

    }), [NUM]);

    return (
        <div ref={container} style={Container} onWheel={wheelEvent}>

            {currentItems.map((item: any, index: React.Key | null | undefined) => (
                    <div data-index={index}
                         className={item !== null ? 'observed' : 'empty'}
                         key={item !== null ? item?.id : null}>
                        <picture>
                            <source
                                type="image/webp"/>
                            <img style={Item} src={
                                item !== null ? item?.download_url : null
                            } alt={item?.author}/>
                        </picture>
                    </div>
            ))}

        </div>
    )
})

export default ViewItems;