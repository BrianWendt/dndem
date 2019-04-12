import React from 'react';

export default class MonsterCardDetail extends React.Component {
    render(){
        return (
                <tr>
                    <td className="text-right"><strong>{this.props.dt}</strong></td>
                    <td className="">{this.props.dd}</td>
                </tr>
                );
    }
};