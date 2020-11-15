import {Box, Card, DataTable, Tab, Tabs, Text} from "grommet";
import {useEffect, useState} from "react";
import {Tip} from "grommet/components/Tip";
import {Edit3 as Edit3Feather} from "react-feather";

export default function StrikeList() {
    const [strikes, setStrikes] = useState([]);
    const [bans, setBans] = useState([]);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" }

    useEffect(() => {
        setBans([
            {
                username: "BannedUser#0000",
                userid: "0000123456",
                totalStrikes: 3,
                date: new Date(2020, 5, 10),
                notes: "Rule 4 and 10"
            }
        ]);

        setStrikes([
            {
                username: "SomeUser#0000",
                userid: "12345600000",
                activeStrikes: 2,
                totalStrikes: 3,
                activeCaseIds: [3, 4],
                totalCaseIds: [1, 3, 4],
                lastStrikeDate: new Date(Date.UTC(2020, 9, 19)),
                strikeExpiration: new Date(Date.UTC(2020, 10, 17)),
                notes: "Rule 4 and 10"
            },
            {
                username: "SomeoneElse#0000",
                userid: "12345600001",
                activeStrikes: 0,
                totalStrikes: 1,
                activeCaseIds: [],
                totalCaseIds: [2],
                lastStrikeDate: new Date(Date.UTC(2020, 7, 12)),
                strikeExpiration: "N/A",
                notes: "Rule 2"
            }
        ]);
    }, []);

    function searchStrike() {

    }

    function searchBan() {

    }

    return (
        <Box pad={{horizontal: "small"}}>
            <Tabs>
                <Tab title="Strikes">
                    <Card height="large" width="xxlarge">
                        <DataTable fill="horizontal" pad="small" data={strikes}
                                   columns={[
                                       {
                                           property: "username",
                                           header: <Text>User</Text>,
                                           render: datum => (
                                               <Tip dropProps={{ align: { top: 'right' } }} content={
                                                   <Box pad="small" gap="small" width={{ max: "small" }} round="small" background="background-back" plain>
                                                       <Text>User ID: {datum.userid}</Text>
                                                   </Box>
                                               }>
                                                   <Text>{datum.username}</Text>
                                               </Tip>
                                           ),
                                           primary: true
                                       },
                                       {
                                           property: "activeStrikes",
                                           header: <Text>Active strikes</Text>,
                                           render: datum => (
                                               <Tip dropProps={{ align: { top: 'right' } }} content={
                                                   <Box pad="small" gap="small" width={{ max: "small" }} round="small" background="background-back" plain>
                                                       <Text>Case ID's: {datum.activeCaseIds.length === 0 ? "None" : datum.activeCaseIds.join(", ")}</Text>
                                                   </Box>
                                               }>
                                                   <Text>{datum.activeStrikes}</Text>
                                               </Tip>
                                           )
                                       },
                                       {
                                           property: "lastStrikeDate",
                                           header: <Text>Last strike issued date</Text>,
                                           render: datum => {
                                               const date = datum.lastStrikeDate.toLocaleDateString("en-US", dateOptions).split(",");
                                               date[0] = `${date[0]}th`
                                               const newDateString = date.join(", ");
                                               return <Text>{newDateString}</Text>;
                                           }
                                       },
                                       {
                                           property: "strikeExpiration",
                                           header: <Text>When next strike expires</Text>,
                                           render: datum => {
                                               if (datum.strikeExpiration instanceof Date) {
                                                   const date = datum.strikeExpiration.toLocaleDateString("en-US", dateOptions).split(",");
                                                   date[0] = `${date[0]}th`
                                                   const newDateString = date.join(", ");
                                                   return <Text>{newDateString}</Text>;
                                               } else return <Text>{datum.strikeExpiration}</Text>;
                                           }
                                       },
                                       {
                                           property: "totalStrikes",
                                           header: <Text>Total strikes</Text>,
                                           render: datum => (
                                               <Tip dropProps={{ align: { top: 'right' } }} content={
                                                   <Box pad="small" gap="small" width={{ max: "small" }} round="small" background="background-back" plain>
                                                       <Text>Case ID's: {datum.totalStrikes.length === 0 ? "None" : datum.totalCaseIds.join(", ")}</Text>
                                                   </Box>
                                               }>
                                                   <Text>{datum.totalStrikes}</Text>
                                               </Tip>
                                           )
                                       },
                                       {
                                           property: "notes",
                                           header: <Text>Notes</Text>,
                                           render: datum => <Text>{datum.notes}<span style={{float: "right", cursor: "pointer"}} onClick={() => alert("Edit")}><Edit3Feather/></span></Text>
                                       }
                                   ]}
                        />
                    </Card>
                </Tab>
                <Tab title="Banned">
                    <Card height="large" width="xxlarge">

                    </Card>
                </Tab>
            </Tabs>
        </Box>
    )
}