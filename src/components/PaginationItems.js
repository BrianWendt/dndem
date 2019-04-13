import React from 'react';
import { Pagination } from 'react-bootstrap';

export default class PaginationItems extends React.Component {

    render(){
        return (this.props.itemCount < 1) ? false : this.renderItems();
    }

    renderItems(){
        const {itemOnClick, itemCount, maxItems, activeItem } = this.props;
        let items = [];

        for (let number = 1; number <= itemCount; number++) {
            items.push(<Pagination.Item key={number} active={number === activeItem} onClick={itemOnClick} data-page={number}>{number}</Pagination.Item>);
        }

        if(itemCount > maxItems){
            const mid = Math.round(maxItems / 2);
            var start = 0;
            var end = maxItems + 1;
            if((activeItem + maxItems) > itemCount){ // getting to the end
                start = itemCount - maxItems - 1;
                end = itemCount;
            } else if(activeItem > mid){ //after reaching the middle
                start = activeItem - 2;
                end = start + maxItems;
            }

            var prepend = [];
            if(start > 0){
                prepend.unshift(<Pagination.Ellipsis key="l-ellipsis" disabled />);
            }

            var append = [];
            if(end+1 < itemCount){
                append.push(<Pagination.Ellipsis key="r-ellipsis" disabled />);
            }

            items = items.slice(start, end);
            items.unshift(prepend);
            items.push(append);

            var prev = (activeItem - 1 < 1) ? 1 : activeItem - 1;
            items.unshift(<Pagination.Prev key="prev" onClick={itemOnClick} data-page={prev} />);
            items.unshift(<Pagination.First key="first" onClick={itemOnClick} data-page={1} />);

            var next = (activeItem + 1 > itemCount) ? itemCount : activeItem + 1;
            items.push(<Pagination.Next key="next" onClick={itemOnClick} data-page={next} />);
            items.push(<Pagination.Last key="last" onClick={itemOnClick} data-page={itemCount} />);

            return items;
        } else {
            return items;
        }
    }
}

PaginationItems.defaultProps = {
    "itemOnClick": false,
    "itemCount": 0,
    "maxItems": 5,
    "activeItem": 0
}
