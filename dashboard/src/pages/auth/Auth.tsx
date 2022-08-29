import { Input, Button } from "components/core";

const Auth = () => {
  return (
    <div>
      <h1>Auth</h1>
      <div>
        <Input placeholder="email" />
        <Input placeholder="password" type='password' />
        <Button>Send</Button>
      </div>
    </div>
  );
};

export default Auth;
