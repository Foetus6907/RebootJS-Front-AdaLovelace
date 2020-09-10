import React, {Component} from 'react';

interface LoginTabPanelProps {
  index: number;
  valueTab: number;
  children: React.ReactNode;
}

class LoginTabPanel extends Component<LoginTabPanelProps> {
  render() {
    const hidden = this.props.valueTab !== this.props.index ? true : false;
    return (
      <div hidden={hidden} >
        {this.props.children}
      </div>
    );
  }
}

export default LoginTabPanel;
