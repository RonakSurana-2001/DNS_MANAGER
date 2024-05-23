const { Route53Client, CreateHostedZoneCommand, DeleteHostedZoneCommand, ListHostedZonesByNameCommand } = require("@aws-sdk/client-route-53");
const zod=require("zod")

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};

const client = new Route53Client(config);

const createHostedZone = async (req, res) => {

    const hzData=zod.object({
        domainName:zod.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          }),
        description:zod.string().optional()
    })

    const validate=hzData.safeParse(req.body);

    if(validate.success){
        const { domainName, description} = req.body
        try {
            const input = {
                CallerReference: new Date().toString(),
                Name: domainName,
                HostedZoneConfig: {
                    Comment: description
                },
            };
            const client = new Route53Client(config);
            const command = new CreateHostedZoneCommand(input);
            const response = await client.send(command);
            res.send({
                success:true,
                message:response
            })
        } catch (error) {
            res.send({
                success:false,
                message:error
            })
        }
    }
    else{
        res.send({
            success:false,
            message:"Some Error Occurred"
        })
    }
}

const deleteHostedZone = async (req, res) => {

    const hzData=zod.object({
        hostedZoneId:zod.string({
            required_error: "Id is required",
            invalid_type_error: "ID must be a string",
          })
    })

    const validate=hzData.safeParse(req.body);

    if(validate.success){

        const {hostedZoneId}=req.body
        try {
            const input = {
                Id: hostedZoneId,
            };
            const command = new DeleteHostedZoneCommand(input);
            const response = await client.send(command);
            res.send({
                success:true,
                message:response
            })
        } catch (error) {
            res.send({
                success:false,
                message:"Some Error Occurred"
            })
        }
    }
    else{
        res.send({
            success:false,
            message:validate.error
        })
    }

}

const listHostedZone = async (req, res) => {

    const hzData=zod.object({
        domainName:zod.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          }),
          hostedZoneId:zod.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
          })
    })

    const validate=hzData.safeParse(req.body);

    if(validate.success){
        const { domainName, hostedZoneId} = req.body
        try {
            const input = {
                DNSName: domainName,
                HostedZoneId: hostedZoneId
            };
            const command = new ListHostedZonesByNameCommand(input);
            const response = await client.send(command);
            res.send({
                success:true,
                message:response
            })
        } catch (error) {
            res.send({
                success:false,
                message:"Some Error Occurred"
            })
        }
    }
    else{
        res.send({
            success:false,
            message:"Some Error Occurred"
        })
    }
}

module.exports = {
    createHostedZone,
    deleteHostedZone,
    listHostedZone
};
