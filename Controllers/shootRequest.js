const { getRepository } = require('typeorm');
const ShootRequests = require('../entities/ShootRequests'); // Import your ShootRequests entity
const Customer = require('../entities/Customer'); // Import your Customer entity


const { getRepository } = require('typeorm');
const ShootRequests = require('../entities/ShootRequests'); // Import your ShootRequests entity
const ShootAdditionalServices = require('../entities/ShootAdditionalServices'); // Import your ShootAdditionalServices entity
const Payment = require('../payment'); // Import your payment processing module

const postShootRequest = async (req, res) => {
  const shootRequestRepository = getRepository(ShootRequests);
  const additionalServiceRepository = getRepository(ShootAdditionalServices);
  
  const { customerId } = req.user; 
  const { plan_type, additional_services, paymentDetails } = req.body; // Expecting payment details to be passed

  try {
    if (!plan_type) {
      return res.status(400).json({ message: 'Plan type is required.' });
    }

    
    const paymentResult = await Payment.processPayment(paymentDetails); 

    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed: ' + paymentResult.message });
    }

    
    const newShootRequest = shootRequestRepository.create({
      customer_id: customerId, 
      plan_type
    });

   
    const savedShootRequest = await shootRequestRepository.save(newShootRequest);

   
    if (additional_services && additional_services.length > 0) {
      const additionalServicesToSave = additional_services.map(service => {
        return additionalServiceRepository.create({
          shoot_requests_id: savedShootRequest.id, 
          additional_service: service
        });
      });

    
      await additionalServiceRepository.save(additionalServicesToSave);
    }

    res.status(201).json({
      message: 'Shoot request created successfully after payment',
      shootRequest: savedShootRequest
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating shoot request',
      error: error.message
    });
  }
};


const updateShootRequestStatus = async (req, res) => {
    const shootRequestId = req.params.id; 
    const { statusId } = req.body; 
  
    const shootRequestRepository = getRepository(ShootRequests);
    const shootRequestStatusRepository = getRepository(ShootRequestStatus);
  
    try {
    
      const shootRequest = await shootRequestRepository.findOne(shootRequestId);
      if (!shootRequest) {
        return res.status(404).json({ message: 'Shoot request not found.' });
      }
  
     
      const newStatusEntry = shootRequestStatusRepository.create({
        shoot_request_id: shootRequest.id,
        status_id: statusId
      });
  
      
      await shootRequestStatusRepository.save(newStatusEntry);
  
    
      shootRequest.status_id = statusId; 
      await shootRequestRepository.save(shootRequest);
  
      res.status(200).json({
        message: 'Shoot request status updated successfully',
        shootRequest: shootRequest,
        statusEntry: newStatusEntry
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating shoot request status',
        error: error.message
      });
    }
  };

module.exports={postShootRequest, updateShootRequestStatus}