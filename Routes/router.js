const express = require('express');

const router = express.Router();

const {addAddress,updateAddress,deleteAddress,addBusinessDetails,deleteBusinessDetails,updateBusinessDetails} = require('../Controllers/CustomerController.js');
const { updateShootRequestStatus, postShootRequest } = require('../Controllers/shootRequest.js');
const { createMission } = require('../Controllers/missionRequest.js');



//customer address
router.post('/address', addAddress);


router.put('/address/:id',updateAddress);


router.delete('/address/:id', deleteAddress);



//customer buisness detail
router.post('/business-details', addBusinessDetails);


router.put('/business-details/:id', updateBusinessDetails);


router.delete('/business-details/:id', deleteBusinessDetails);



//shoot-detail

router.post('/shoot-requests', postShootRequest);

router.patch('/shoot-requests/:id/status', updateShootRequestStatus)


//mission

router.post('/mission', createMission);





module.exports = router;
