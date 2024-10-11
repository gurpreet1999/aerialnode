


const updateCustomerProfile = async (req, res) => {
    const connection = getConnection();
    
    try {
      // Get the customer ID from the request parameters and data from the body
      const { id } = req.params;
      const {
        user_id,
        name,
        email,
        profile_pic,
      } = req.body;
  
      // Validate required fields
      if (!id) {
        return res.status(400).json({ message: 'Customer ID is required.' });
      }
  
      // Find the existing customer
      const customerRepository = connection.getRepository(Customer);
      const customer = await customerRepository.findOne({ where: { id } });
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }
  
      // Update the customer's details
      if (user_id !== undefined) customer.user_id = user_id;
      if (name) customer.name = name;
      if (email) {
        // Check for existing customer with the same email
        const existingCustomer = await customerRepository.findOne({ where: { email, id: Not(id) } });
        if (existingCustomer) {
          return res.status(409).json({ message: 'Email is already in use by another account.' });
        }
        customer.email = email;
      }
      if (profile_pic) customer.profile_pic = profile_pic;
  
      // Save the updated customer
      await customerRepository.save(customer);
  
      return res.status(200).json({
        message: 'Customer profile updated successfully!',
        customer,
      });
    } catch (error) {
      console.error('Error updating customer profile:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  

const addAddress = async (req, res) => {
    const addressRepository = getRepository(Address);
    try {
        const newAddress = addressRepository.create(req.body); 
        await addressRepository.save(newAddress); 
        res.status(201).json({ message: 'Address added successfully', address: newAddress });
      } catch (error) {
        res.status(500).json({ message: 'Error adding address', error: error.message });
      }
};


const updateAddress = async (req, res) => {
    const { id } = req.params;
    const addressRepository = getRepository(Address);
    
    try {
      const addressToUpdate = await addressRepository.findOne(id); 
      if (!addressToUpdate) {
        return res.status(404).json({ message: 'Address not found' });
      }
      
   
      addressRepository.merge(addressToUpdate, req.body);
      const updatedAddress = await addressRepository.save(addressToUpdate);
      res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
      res.status(500).json({ message: 'Error updating address', error: error.message });
    }
};


const deleteAddress = async (req, res) => {
    const { id } = req.params;
    const addressRepository = getRepository(Address);
    
    try {
      const deleteResult = await addressRepository.delete(id); 
      if (deleteResult.affected === 0) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
};



const addBusinessDetails = async (req, res) => {
    const businessDetailsRepository = getRepository(BusinessDetails);
    
    try {
      const newBusinessDetails = businessDetailsRepository.create(req.body); 
      await businessDetailsRepository.save(newBusinessDetails); 
      res.status(201).json({ message: 'Business details added successfully', businessDetails: newBusinessDetails });
    } catch (error) {
      res.status(500).json({ message: 'Error adding business details', error: error.message });
    }
  };
  

  const updateBusinessDetails = async (req, res) => {
    const { id } = req.params;
    const businessDetailsRepository = getRepository(BusinessDetails);
    
    try {
      const businessDetailToUpdate = await businessDetailsRepository.findOne(id); 
      if (!businessDetailToUpdate) {
        return res.status(404).json({ message: 'Business details not found' });
      }
      
     
      businessDetailsRepository.merge(businessDetailToUpdate, req.body);
      const updatedBusinessDetails = await businessDetailsRepository.save(businessDetailToUpdate); 
      res.status(200).json({ message: 'Business details updated successfully', businessDetails: updatedBusinessDetails });
    } catch (error) {
      res.status(500).json({ message: 'Error updating business details', error: error.message });
    }
  };
  
  
  const deleteBusinessDetails = async (req, res) => {
    const { id } = req.params;
    const businessDetailsRepository = getRepository(BusinessDetails);
    
    try {
      const deleteResult = await businessDetailsRepository.delete(id); // Delete the business details
      if (deleteResult.affected === 0) {
        return res.status(404).json({ message: 'Business details not found' });
      }
      res.status(200).json({ message: 'Business details deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting business details', error: error.message });
    }
  };




















module.exports={addAddress,deleteAddress,updateAddress,addBusinessDetails,deleteBusinessDetails,updateBusinessDetails}