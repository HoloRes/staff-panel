import {Box, Button, Card, CardBody, Form, FormField, Heading, Select, Text, TextArea, TextInput} from "grommet";
import axios from "axios";
import parseDuration from "parse-duration"
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [modLog, setModLog] = useState([]);
    const [strikeValue, setStrikeValue] = useState({});

    useEffect(() => {
        // TODO: Get last 3 items from API and afterwards connect to Socket.IO
        const recent = [{
            _id: 1,
            type: "strike",
            offender: "user#0000",
            reason: "None given",
            subType: "Mute (20h)"
        }];

        const items = recent.map((modAction) => (
            <div key={modAction._id}>
                <Text color="#707070">
                    Case {modAction._id} - {modAction.type}
                    <br/>
                    <hr style={{width: "7.5vw", opacity: "25%", float: "left"}}/>
                </Text>
                <br/>
                <Text size="16px">
                    <b>Offender:</b> {modAction.offender}
                    <br/>
                    <b>Reason:</b> {modAction.reason}
                    {
                        modAction.subType &&
                        <>
                            <br/>
                            <b>Type:</b> Mute (20h)
                        </>
                    }
                </Text>
                <br/>
            </div>
        ));
        setModLog(items);
    }, []);

    function handleStrikeSubmit() {
        
    }

    function validateDuration() {
        console.log("Validating");
        const duration = parseDuration(strikeValue.duration);
        if (duration === null) return {message: "Not a valid duration", status: "error"};
        if (duration <= 0) return {message: "A negative duration is not allowed", status: "error"};
        else return null;
    }

    return (
        <Box pad={{vertical: "small", horizontal: "medium"}} direction="row" gap="large">
            <Card width="medium" height="60vh" pad={{horizontal: "small", vertical: "none"}}>
                <Heading level="4" textAlign="center" color="#1C2126">Modlog
                    <hr style={{color: "#707070", opacity: "25%"}}/>
                </Heading>
                <CardBody>
                    {modLog}
                </CardBody>
            </Card>
            <Card width="large" height="60vh" pad={{horizontal: "small", vertical: "none"}}>
                <Heading level="4" style={{maxWidth: "100%"}} textAlign="center" color="#1C2126">Strike user
                    <hr style={{color: "#707070", opacity: "25%"}}/>
                </Heading>
                <CardBody>
                    <Form
                        value={strikeValue}
                        onChange={newValue => setStrikeValue(newValue)}
                        onSubmit={handleStrikeSubmit}
                        validate="blur"
                    >
                        <Box direction="row" gap="xlarge">
                            <Box>
                                <FormField name="userid" htmlfor="text-input-userid" label="User" required
                                    validate={(userid) => { // * Temporary user id check, needs to be replaced with an API call to get member details
                                        const valid = /^[0-9]{18}$/g.test(userid);
                                        if(valid) return "";
                                        else return {message: "Not a valid user ID", status: "error"};
                                    }}
                                >
                                    <TextInput id="text-input-userid" name="userid" value={strikeValue.userid ? strikeValue.userid : ""} placeholder="User ID"/>
                                </FormField>
                                <FormField name="type" htmlfor="dropdown-input-type" label="Type" required>
                                    <Select id="dropdown-input-type" name="type"
                                            options={["Warn", "Mute", "Kick", "Ban"]}/>
                                </FormField>
                                {
                                    strikeValue.type && strikeValue.type !== "Warn" && strikeValue.type !== "Kick" ?
                                        <FormField name="duration" htmlfor="text-input-duration" label="Duration" required
                                                   validate={(inputDuration) => {
                                                       const duration = parseDuration(inputDuration);
                                                       if (duration === null) return {message: "Not a valid duration", status: "error"};
                                                       if (duration <= 0) return {message: "A negative duration is not allowed", status: "error"};
                                                       else return "";
                                                   }}
                                        >
                                            <TextInput id="text-input-duration" name="duration" value={strikeValue.duration ? strikeValue.duration : ""}/>
                                        </FormField> : null
                                }
                            </Box>
                            <Box>
                                <FormField name="reason" htmlfor="text-input-reason" label="Reason">
                                    <TextArea id="text-input-reason" name="reason" placeholder="Give a reason"
                                              resize={false} style={{height: "350px", width: "385px"}}/>
                                </FormField>
                                <Button primary type="submit" label="Submit"/>
                            </Box>
                        </Box>
                    </Form>
                </CardBody>
            </Card>
        </Box>
    )
}