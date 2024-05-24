const express=require("express")
const router=express.Router()
const {listRecords,createRecord,updateRecord,deleteRecord}=require("../controllers/dnsRecordsController")

router.post("/listRecords/:id",listRecords)
router.post("/createRecord",createRecord)
router.post("/updateRecord",updateRecord)
router.post("/deleteRecord",deleteRecord)

module.exports=router;