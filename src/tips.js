import React, { Component } from 'react';

export default class Tips extends Component {
    static propTypes = {
        show: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        myStyle: React.PropTypes.string,
        content: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
    }

    static defaultProps = {
        show: false,
        myStyle: 'warning',
        content: false
    }

    render() {
        let { value, children, show, myStyle, content } = this.props;
        let ifShow = typeof show === 'boolean' ? show : show(value);

        return (
            <div style={{display: ifShow ? 'block' : 'none'}} className={`bg-${myStyle}`}>
                {
                    content ?
                        ( typeof content === 'string' ? content: content(value)) :
                        children
                }
            </div>
        );
    }
}
