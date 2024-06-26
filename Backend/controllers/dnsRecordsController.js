const { Route53Client, ListResourceRecordSetsCommand,ChangeResourceRecordSetsCommand } = require("@aws-sdk/client-route-53");

const zod = require("zod")

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};

const client = new Route53Client(config);

const listRecords = async (req, res) => {

    const hzData = zod.string()

    const validate = hzData.safeParse(req.params.id);
    if (validate.success) {
        try {
            const  hostedZoneId  = req.params.id
            const input = { // ListResourceRecordSetsRequest
                HostedZoneId: hostedZoneId, // required
            };
            const command = new ListResourceRecordSetsCommand(input);
            const response = await client.send(command);
            res.send({
                success: true,
                message: response
            })
        } catch (error) {
            res.send({
                success: false,
                message: error
            })
        }
    }
    else {
        res.send({
            success: false,
            message: "Some Error Occurred"
        })
    }

}

const createRecord = async (req, res) => {

    const hzData = zod.object({
        dnsName:zod.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        ttl:zod.number({
            required_error: "TTL is required",
            invalid_type_error: "TTL must be a Number",
        }),
        type:zod.string({
            required_error: "Type is required",
            invalid_type_error: "Type must be a string",
        }),
        hostedZoneId: zod.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    })

    const validate = hzData.safeParse(req.body);

    function formatUrlForRoute53(url) {
        // Define a mapping of characters to their ASCII escape sequences
        const escapeMap = {
            ':': '\\072',
            '/': '\\057'
        };
    
        // Use a regular expression to replace each character in the URL
        const formattedUrl = url.replace(/[:\/]/g, match => escapeMap[match]);
    
        return formattedUrl;
    }

    if (validate.success) {
        const { dnsName, recordValue, ttl, type, hostedZoneId } = req.body
        const formattedUrl = formatUrlForRoute53(dnsName);
        console.log(req.body)
        try {
            const input = {
                ChangeBatch: {
                    Changes: [
                        {
                            Action: "CREATE",
                            ResourceRecordSet: {
                                Name: formattedUrl,
                                ResourceRecords: recordValue,
                                TTL: ttl,
                                Type: type
                            }
                        }
                    ],
                },
                HostedZoneId: hostedZoneId
            };
            const command = new ChangeResourceRecordSetsCommand(input);
            const response = await client.send(command);
            res.send({
                success: true,
                message: response
            })
        } catch (error) {
            console.log(error)
            res.send({
                success: false,
                message: error
            })
        }
    }
    else {
        console.log(error)
        res.send({
            success: false,
            message: validate.error
        })
    }

}


const updateRecord = async (req, res) => {

    const hzData = zod.object({
        dnsName:zod.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        ttl:zod.number({
            required_error: "TTL is required",
            invalid_type_error: "TTL must be a Number",
        }),
        type:zod.string({
            required_error: "Type is required",
            invalid_type_error: "Type must be a string",
        }),
        hostedZoneId: zod.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    })

    const validate = hzData.safeParse(req.body);

    if (validate.success) {
        const { dnsName, recordValue, ttl, type, hostedZoneId } = req.body
        try {
            const input = {
                ChangeBatch: {
                    Changes: [
                        {
                            Action: "UPSERT",
                            ResourceRecordSet: {
                                Name: dnsName,
                                ResourceRecords: recordValue,
                                TTL: ttl,
                                Type: type
                            }
                        }
                    ],
                },
                HostedZoneId: hostedZoneId
            };
            const command = new ChangeResourceRecordSetsCommand(input);
            const response = await client.send(command);
            res.send({
                success: true,
                message: response
            })
        } catch (error) {
            res.send({
                success: false,
                message: error
            })
        }
    }
    else {
        res.send({
            success: false,
            message: validate.error
        })
    }

}

const deleteRecord = async (req, res) => {

    const hzData = zod.object({
        dnsName:zod.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        ttl:zod.number({
            required_error: "TTL is required",
            invalid_type_error: "TTL must be a Number",
        }),
        type:zod.string({
            required_error: "Type is required",
            invalid_type_error: "Type must be a string",
        }),
        hostedZoneId: zod.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        })
    })

    const validate = hzData.safeParse(req.body);

    if (validate.success) {
        const { dnsName, recordValue, ttl, type, hostedZoneId } = req.body
        try {
            const input = {
                ChangeBatch: {
                    Changes: [
                        {
                            Action: "DELETE",
                            ResourceRecordSet: {
                                Name: dnsName,
                                ResourceRecords:recordValue,
                                TTL: ttl,
                                Type: type
                            }
                        }
                    ],
                },
                HostedZoneId: hostedZoneId
            };
            const command = new ChangeResourceRecordSetsCommand(input);
            const response = await client.send(command);
            res.send({
                success: true,
                message: response
            })
        } catch (error) {
            res.send({
                success: false,
                message: error
            })
        }
    }
    else {
        res.send({
            success: false,
            message: validate.error
        })
    }

}



module.exports = { listRecords,createRecord,updateRecord,deleteRecord }