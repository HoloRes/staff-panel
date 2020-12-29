import {Box, Button, Card, CardBody, Form, FormField, Heading, Select, Text, TextArea, TextInput} from "grommet";
import axios from "axios";
import parseDuration from "parse-duration"
import {useEffect, useState} from "react";
import {useFormik} from "formik";

export default function Dashboard() {
    const [modLog, setModLog] = useState([]);

    useEffect(() => {
        // TODO: Get last 3 items from API and afterwards connect to Socket.IO
        const recent = [
            {
                _id: 1,
                type: "strike",
                offender: "user#0000",
                reason: "None given",
                subType: "Mute (20h)"
            },
            {
                _id: 2,
                type: "warn",
                offender: "user#0000",
                reason: "Rule 4",
            },
            {
                _id: 3,
                type: "warn",
                offender: "user#0000",
                reason: "Rule 10",
            }
        ];

        const items = recent.map((modAction) => (
            <div key={modAction._id}>
                <Text style={{opacity: "75%"}}>
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
                <br/>
            </div>
        ));
        setModLog(items);
    }, []);

    const validate = values => {
        let errors = {};

        if(!values.userid) errors.userid = "Required";

        // * Temporary user id check, needs to be replaced with an API call to get member details
        const valid = /^[0-9]{18}$/g.test(values.userid);
        if(!valid) errors.userid = "Invalid user id";

        if(values.type !== "Warn" && values.type !== "Kick") {
            const duration = parseDuration(values.duration);
            if (duration === null) errors.duration = "Not a valid duration";
            else if (duration <= 0) errors.duration = "A negative duration is not allowed";
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            userid: "",
            type: null,
            duration: "",
            reason: ""
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <Box pad={{vertical: "small", horizontal: "medium"}} direction="row" gap="large">
            <Card width="medium" height="60vh" pad={{horizontal: "small", vertical: "none"}}>
                <Heading level="4" textAlign="center">Modlog
                    <hr style={{color: "#707070", opacity: "25%"}}/>
                </Heading>
                <CardBody>
                    {modLog}
                </CardBody>
            </Card>
            <Card width="large" height="60vh" pad={{horizontal: "small", vertical: "none"}}>
                <Heading level="4" style={{maxWidth: "100%"}} textAlign="center">Strike user
                    <hr style={{color: "#707070", opacity: "25%"}}/>
                </Heading>
                <CardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <Box direction="row" gap="xlarge">
                            <Box>
                                <FormField name="userid" htmlfor="text-input-userid" label="User">
                                    <TextInput id="text-input-userid" name="userid" value={formik.values.userid} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="User ID"/>
                                </FormField>
                                {(formik.errors.userid && formik.touched.userid) && <Text color="status-critical">{formik.errors.userid}</Text>}

                                <FormField name="type" htmlfor="dropdown-input-type" label="Type" required>
                                    <Select id="dropdown-input-type" name="type"
                                            options={["Strike", "Warn", "Mute", "Kick", "Ban"]} value={formik.values.type} onChange={({value}) => {formik.setFieldValue("type", value);formik.setFieldTouched("type", true);}} onBlur={formik.handleBlur}/>
                                </FormField>
                                {(formik.errors.type && formik.touched.type) && <Text color="status-critical">{formik.errors.type}</Text>}
                                {
                                    formik.values.type && formik.values.type !== "Strike" && formik.values.type !== "Warn" && formik.values.type !== "Kick" ?
                                        <>
                                            <FormField name="duration" htmlfor="text-input-duration" label="Duration" required>
                                                <TextInput id="text-input-duration" name="duration" value={formik.values.duration} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                            </FormField>
                                            {(formik.errors.duration && formik.touched.duration) && <Text color="status-critical">{formik.errors.duration}</Text>}
                                        </>: null
                                }
                            </Box>
                            <Box>
                                <FormField name="reason" htmlfor="text-input-reason" label="Reason">
                                    <TextArea id="text-input-reason" name="reason" placeholder="Give a reason"
                                              resize={false} style={{height: "350px", width: "385px"}} value={formik.values.reason} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                </FormField>
                                {(formik.errors.reason && formik.touched.reason) && <Text color="status-critical">{formik.errors.reason}</Text>}

                                <Button type="submit" primary label="Submit"/>
                            </Box>
                        </Box>
                    </form>
                </CardBody>
            </Card>
            <Card width="medium" height="medium" pad={{horizontal: "small", vertical: "none"}}>
                <Heading level="4" textAlign="center">User notes
                    <hr style={{color: "#707070", opacity: "25%"}}/>
                </Heading>
                <CardBody>
                    <FormField name="userid" htmlfor="text-input-userid">
                        <TextInput id="text-input-userid" name="userid" placeholder="User ID"/> {/* TODO: Make controlled */}
                    </FormField>
                    <br/>
                    <Button type="submit" primary label="Search" />
                    {/* TODO: Search and give popup with notes about user */}
                </CardBody>
            </Card>
        </Box>
    )
}