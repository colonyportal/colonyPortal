import * as React from "react";

type Props = {
  count: number;
  setAddress: (address: string) => any;
  getCount: () => any;
};

export class ColonyTest extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event: any) {
    this.props.setAddress(this.state.address);
    this.props.getCount();
    event.preventDefault();
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        <h1>Add Colony</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Colony Address:
            <br/>
            <input
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Add Colony" />
        </form>
        <hr/>
        <p>Number of domains in Colony: {count}</p>
      </div>
    );
  }
}
