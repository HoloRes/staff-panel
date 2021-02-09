import {Box, Card, DataTable, Text, TextInput} from 'grommet';
import {Tip} from 'grommet/components/Tip';
import {Edit3 as Edit3Feather} from 'react-feather';
import {useEffect, useState} from 'react';

export default function ModLog() {
    const [moderationLog, setModerationLog] = useState([]);

    const [currentEdit, setCurrentEdit] = useState('');
    const [editValue, setEditValue] = useState('');

    const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'}

    useEffect(() => {
        setModerationLog([
            {
                _id: 3,
                username: 'SomeUser#0000',
                userId: '12345600000',
                type: 'Strike',
                date: new Date(Date.UTC(2020, 9, 19)),
                moderator: 'AModerator#0000',
                moderatorId: '222211114444',
                duration: '7 days',
                strike: true,
                reason: 'Rule 4 and 10'
            },
            {
                _id: 2,
                username: 'SomeoneElse#0000',
                userId: '12345600001',
                type: 'Mute',
                date: new Date(Date.UTC(2020, 7, 12)),
                moderator: 'AModerator#0000',
                moderatorId: '222211114444',
                duration: '20 hours',
                strike: true,
                reason: 'Rule 2'
            },
            {
                _id: 1,
                username: 'AnotherPerson#0000',
                userId: '12345600002',
                type: 'Warn',
                date: new Date(Date.UTC(2020, 7, 10)),
                moderator: 'AModerator#0000',
                moderatorId: '222211114444',
                duration: 'N/A',
                strike: false,
                reason: 'Rule 2'
            }
        ])
    }, []);

    function search() {

    }

    function handleReasonUpdate(event) {
        event.preventDefault();

        const newLog = moderationLog.map((logItem) => {
            let temp = Object.assign({}, logItem);
            if(temp._id === currentEdit) {
                temp.reason = editValue;
            }
            return temp;
        });
        setModerationLog(newLog);

        setCurrentEdit('');
        setEditValue('');
    }

    return (
        <Box pad={{horizontal: 'small'}}>
            <Card height='large' width='xxlarge'>
                <DataTable fill='horizontal' pad='small' data={moderationLog}
                           columns={[
                               {
                                   property: '_id',
                                   header: <Text>Case ID</Text>,
                                   primary: true
                               },
                               {
                                   property: 'username',
                                   header: <Text>User</Text>,
                                   render: datum => (
                                       <Tip dropProps={{align: {top: 'right'}}} content={
                                           <Box pad='small' gap='small' width={{max: 'small'}} round='small'
                                                background='background-back' plain>
                                               <Text>User ID: {datum.userId}</Text>
                                           </Box>
                                       }>
                                           <Text>{datum.username}</Text>
                                       </Tip>
                                   )
                               },
                               {
                                   property: 'type',
                                   header: <Text>Type</Text>
                               },
                               {
                                   property: 'date',
                                   header: <Text>Date</Text>,
                                   render: datum => {
                                       const date = datum.date.toLocaleDateString('en-US', dateOptions).split(',');
                                       date[0] = `${date[0]}th`
                                       const newDateString = date.join(', ');
                                       return <Text>{newDateString}</Text>;
                                   }
                               },
                               {
                                   property: 'moderator',
                                   header: <Text>Moderator</Text>,
                                   render: datum => (
                                       <Tip dropProps={{align: {top: 'right'}}} content={
                                           <Box pad='small' gap='small' width={{max: 'small'}} round='small'
                                                background='background-back' plain>
                                               <Text>User ID: {datum.moderatorId}</Text>
                                           </Box>
                                       }>
                                           <Text>{datum.moderator}</Text>
                                       </Tip>
                                   ),
                                   primary: true
                               },
                               {
                                   property: 'strike',
                                   header: <Text>Strike</Text>,
                                   render: datum => <Text>{datum.strike ? 'Yes' : 'No'}</Text>
                               },
                               {
                                   property: 'reason',
                                   header: <Text>Reason</Text>,
                                   render: datum => (
                                       currentEdit === datum._id ?
                                           <form onSubmit={handleReasonUpdate}>
                                               <TextInput value={editValue}
                                                          onChange={event => setEditValue(event.target.value)}
                                                          placeholder='Reason'/>
                                           </form>
                                           :
                                           <Text>
                                               {datum.reason}
                                               <span style={{float: 'right', cursor: 'pointer'}}
                                                     onClick={() => {
                                                         if(currentEdit === '') {
                                                             setCurrentEdit(datum._id);
                                                             setEditValue(datum.reason);
                                                         }
                                                     }}>
                                                   <Edit3Feather/>
                                               </span>
                                           </Text>
                                   )
                               }
                           ]}
                />
            </Card>
        </Box>
    )
}
