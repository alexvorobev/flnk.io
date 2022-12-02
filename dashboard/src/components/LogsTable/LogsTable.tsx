import { FC } from "react";
import { Badge, Pane, Table } from "evergreen-ui";
import moment from "moment";

import { UserLog } from "schema/types";
import { UserInfo } from "components/core";

interface Props {
    logs?: UserLog[]
}

export const LogsTable:FC<Props> = ({ logs }) => {

    if (!logs) {
        return null;
    }
    
    return <>
        <Table>
            <Table.Head>
                <Table.TextHeaderCell maxWidth={240}>
                    User
                </Table.TextHeaderCell>
                <Table.TextHeaderCell maxWidth={120}>
                    Action
                </Table.TextHeaderCell>
                <Table.TextHeaderCell maxWidth={120}>
                    Entity
                </Table.TextHeaderCell>
                <Table.TextHeaderCell>
                    Data
                </Table.TextHeaderCell>
                <Table.TextHeaderCell maxWidth={140}>
                    Date
                </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {logs.map(log => (
                <Table.Row key={log.id}>
                    <Table.TextCell maxWidth={240}>
                        <Pane maxWidth='max-content'>
                            <UserInfo user={log.author} />
                        </Pane>
                    </Table.TextCell>
                    <Table.TextCell maxWidth={120}>
                        <Badge color="green">{log.action}</Badge>
                    </Table.TextCell>
                    <Table.TextCell maxWidth={120}>
                        <Badge color="green">{log.entity}</Badge>
                    </Table.TextCell>
                    <Table.TextCell>
                        {log.entityData}
                    </Table.TextCell>
                    <Table.TextCell maxWidth={140}>
                        {moment(`${log.createdAt}`).format('DD.MM.YYYY HH:mm')}
                    </Table.TextCell>
                </Table.Row>))}
                </Table.Body>
        </Table>
    </>
};