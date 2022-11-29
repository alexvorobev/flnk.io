import { Alert, Button } from "evergreen-ui";

import { useAuth } from "controllers/auth/useAuth";

import { UserBlockedWrapper } from "./styles";

export const UserBlocked = () => {
    const { handleLogout } = useAuth();

return <UserBlockedWrapper>
    <Alert
        intent="danger"
        title="Your account has been blocked"
        marginBottom={32}
    >
        Please contact support for more information
    </Alert>
    <Button onClick={handleLogout}>Logout</Button>
</UserBlockedWrapper>};

export default UserBlocked;
