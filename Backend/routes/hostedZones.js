const express=require("express")
const router=express.Router()
const {createHostedZone,deleteHostedZone,listHostedZone,listAllHostedZone,updateHostedZone,createPrivateHostedZone}=require("../controllers/hostedZonesController")

router.post("/createZone",createHostedZone)
router.post("/createZone/privateZone",createPrivateHostedZone)
router.post("/deleteZone",deleteHostedZone)
router.post("/listZone",listHostedZone)
router.get("/listAllZone",listAllHostedZone)
router.post("/updateZone",updateHostedZone)


module.exports=router;