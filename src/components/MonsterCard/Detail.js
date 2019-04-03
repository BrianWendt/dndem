import React from 'react';

export default class MonsterCardDetail extends React.Component {
    render(){
        return (
                <tr>
                    <td className="small col-sm-4 text-right"><strong>{this.props.dt}</strong></td>
                    <td className="small col-sm-8">{this.props.dd}</td>
                </tr>
                );
    }
};