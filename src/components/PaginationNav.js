import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

export default class PaginationNav extends React.Component {

    render(){
        const {pageChange, pageCount, pageActive } = this.props;
        if(pageCount < 2){
            return false;
        }
        return (
            <Form.Group>
                <InputGroup className="mb-3">
                    {pageActive > 1 &&
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" value={pageActive - 1} onClick={pageChange}>Prev</Button>
                    </InputGroup.Prepend>
                    }
                    <Form.Control as="select" value={pageActive} onChange={pageChange}>
                        {this.generateOptions()}
                    </Form.Control>
                    {pageActive < pageCount &&
                    <InputGroup.Append>
                        <Button variant="outline-secondary" value={pageActive + 1} onClick={pageChange}>Next</Button>
                    </InputGroup.Append>
                    }
                </InputGroup>
            </Form.Group>
        );
    }

    generateOptions(){
        const { pageCount } = this.props;
        let items = [];
        for (let number = 1; number <= pageCount; number++) {
            items.push(<option key={number} value={number}>Page {number}</option>);
        }
        return items;
    }
}

PaginationNav.defaultProps = {
    "pageChange": false,
    "pageCount": 0,
    "pageActive": 0
}
