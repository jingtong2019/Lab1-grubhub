import React, {Component} from 'react';

class Operations extends Component {
    render(){
        let {operation} = this.props;
        return (
            <div>
                <p className = "showbar">{operation}</p>
            </div>
        );
    }
}

export default Operations;