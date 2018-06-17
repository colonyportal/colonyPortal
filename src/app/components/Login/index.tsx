import * as React from "react";
import { Button } from 'reactstrap';
import * as styles from './styles.css';

const DEV_CLIENT_ID = 'd345adcdaf9142e9cc19';
const DEV_REDIRECT_URI = 'http://localhost:3000/login';

export default class LoginPage extends React.Component<any, any> {
  componentDidMount() {
    const oauth = window.location.href.match(/\?code=(.*)/);
    if (oauth) {
      const code = oauth.length === 2 && oauth[1] || null;
      fetch(`https://githubcolonygatekeeper.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then((data) => {
          document.cookie = `token=${data.token}`;
          this.props.markUserAsLoggedIn();
        });
    }
  }

  onClickLoginBtn = () => {
    window.location.href =
      `https://github.com/login/oauth/authorize?client_id=${DEV_CLIENT_ID}&scope=user&redirect_uri=${DEV_REDIRECT_URI}`;
  }

  renderButton() {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`mx-auto text-center d-flex flex-column justify-content-center ${styles.login}`}>
          <h3 className="text-uppercase">sign in with</h3>
          <Button onClick={this.onClickLoginBtn} className="btn-social btn-github mt-3" style={{ height: '35px' }}>
            <i className="fab fa-github" />
            Login With Github
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderButton();
  }
}
