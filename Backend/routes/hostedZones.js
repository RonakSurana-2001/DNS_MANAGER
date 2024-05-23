const express=require("express")
const router=express.Router()
const {createHostedZone,deleteHostedZone,listHostedZone,listAllHostedZone}=require("../controllers/hostedZonesController")

router.post("/createZone",createHostedZone)
router.post("/deleteZone",deleteHostedZone)
router.post("/listZone",listHostedZone)
router.get("/listAllZone",listAllHostedZone)


module.exports=router;