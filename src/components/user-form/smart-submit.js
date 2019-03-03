import React from "react";

class SmartSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", disabled: true };
  }
  onChange = event => {
    this.setState({ disabled: event.target.value.length === 0 });
  };
  render() {
    return this.props.children({
      disabled: this.state.disabled,
      onChange: this.onChange
    });
  }
}

export function useSmartForm() {
  const [disabled, setDisabled] = React.useState(true);

  function onChange(evenvt) {
    //console.log(event);
    if (event.target.value.length === 0) setDisabled(true);
    else setDisabled(false);
  }

  return [disabled, onChange];
}

export default SmartSubmit;
