import React, {memo, useEffect, useMemo} from "react";

const ViewItems = memo(({width, NUM, container, currentItems, wheelEvent}) => {

    // const {width,NUM, container, currentItems} = props;
    // console.log(props.props.currentItems)

    const Container = useMemo(() => ({
        'position': 'relative',
        'left': `${0}px`,
        'display': 'flex',
        'justifyContent': 'center',
        'gridTemplateColumns': 'repeat(5, 1fr)',
        'gridGap': ' 10px',
        'margin': ' 0 auto'
    }), [width]);

    const Item = useMemo(() => ({
        'width': `${NUM}px`,
        'height': `100%`,
    }), [NUM]);

    return (
        <div ref={container} style={Container} onWheel={wheelEvent}>

            {currentItems?.map((item: any, index: React.Key | null | undefined) => (
                <div data-index={index}
                     className={item !== null ? 'observed' : 'empty'}
                     key={item !== null ? item.id : index}>
                    <img style={Item} src={item?.download_url} alt={item?.author}/>
                </div>
            ))}

        </div>
    )
})

export default ViewItems;