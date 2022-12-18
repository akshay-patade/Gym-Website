const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const member = data.member;

//Get the product by Id
router.route("/").get(async (req, res) => {
    const memberShipDetail = await member.getAllMemberShipDetail()
    res.status(200).render(`member/list`, { memberShipDetail: memberShipDetail });
})

router.route("/change-status/:id").patch(async (req, res) => {
    try {
        let memberId = req.params.id;
        let status = req.body.status;
        const memberShipDetail = await member.updateMemberStatus(status, memberId)
        res.status(200).send(memberShipDetail);
    }
    catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;