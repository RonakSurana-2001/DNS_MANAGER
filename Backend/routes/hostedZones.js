const express=require("express")
const router=express.Router()
const {createHostedZone,deleteHostedZone,listHostedZone}=require("../controllers/hostedZonesController")

router.post("/createZone",createHostedZone)
router.post("/deleteZone",deleteHostedZone)
router.post("/listZone",listHostedZone)


module.exports=router;