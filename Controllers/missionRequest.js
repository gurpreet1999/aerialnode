const { getRepository } = require('typeorm');
const { Mission, missionSiteDetail, missionSiteContactDetails } = require('../entities'); // Adjust the import path based on your project structure

const createMission = async (req, res) => {
  const missionRepository = getRepository(Mission);
  const siteDetailRepository = getRepository(missionSiteDetail);
  const siteContactRepository = getRepository(missionSiteContactDetails);
  
  const { customerId } = req.user; // Extract customer ID from authenticated user
  const { mission_type, siteDetails, siteContact } = req.body; // Expect siteDetails and siteContact in the request body

  try {
    // Validate input
    if (!mission_type || !siteDetails || !siteContact) {
      return res.status(400).json({ message: 'Mission type, site details, and contact information are required.' });
    }

    // Create and save the mission
    const newMission = missionRepository.create({
      customer_id: customerId,
      mission_type
    });
    await missionRepository.save(newMission);

    // Create and save the site contact details
    const newSiteContact = siteContactRepository.create({
      ...siteContact
    });
    await siteContactRepository.save(newSiteContact);

    // Create and save the site details
    const newSiteDetail = siteDetailRepository.create({
      ...siteDetails,
      mission_id: newMission.id, // Associate the site detail with the new mission
      site_contact_id: newSiteContact.id // Associate the site detail with the new site contact
    });
    await siteDetailRepository.save(newSiteDetail);

    res.status(201).json({
      message: 'Mission created successfully',
      mission: newMission,
      siteDetail: newSiteDetail,
      siteContact: newSiteContact
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating mission',
      error: error.message
    });
  }
};






const linkMissionCategoryToSite = async (req, res) => {
    const categoryRepository = getRepository(MissionCategory);
    const relationRepository = getRepository(SiteMissionCategoryRelation);
  
    const { site_details_id, category_id } = req.body; // Expect site_details_id and category_id in the request body
  
    try {
      // Validate input
      if (!site_details_id || !category_id) {
        return res.status(400).json({ message: 'Site details ID and category ID are required.' });
      }
  
      // Check if the category exists
      const category = await categoryRepository.findOne(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
  
      // Create and save the relationship
      const newRelation = relationRepository.create({
        site_details_id,
        category_id
      });
      await relationRepository.save(newRelation);
  
      res.status(201).json({
        message: 'Mission category linked to site location successfully',
        relation: newRelation
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error linking mission category to site',
        error: error.message
      });
    }
  };



  const linkMissionDataProductToSite = async (req, res) => {
    const relationRepository = getRepository(MissionDataProductsRelation);
    const dataProductRepository = getRepository(MissionDataProducts);
    const siteDetailsRepository = getRepository(SiteDetails);
  
    const { site_details_id, mission_data_product_id } = req.body; // Expect site_details_id and mission_data_product_id in the request body
  
    try {
      // Validate input
      if (!site_details_id || !mission_data_product_id) {
        return res.status(400).json({ message: 'Site details ID and mission data product ID are required.' });
      }
  
      // Check if the mission data product exists
      const missionDataProduct = await dataProductRepository.findOne(mission_data_product_id);
      if (!missionDataProduct) {
        return res.status(404).json({ message: 'Mission data product not found.' });
      }
  
      // Check if the site details exists
      const siteDetails = await siteDetailsRepository.findOne(site_details_id);
      if (!siteDetails) {
        return res.status(404).json({ message: 'Site details not found.' });
      }
  
      // Create and save the relationship
      const newRelation = relationRepository.create({
        mission_data_product_id,
        site_details_id
      });
      await relationRepository.save(newRelation);
  
      res.status(201).json({
        message: 'Mission data product linked to site location successfully',
        relation: newRelation
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error linking mission data product to site',
        error: error.message
      });
    }
  };


  const updateSiteProgressStatus = async (req, res) => {
    const siteProgressStatusRepository = getRepository(SiteProgressStatus);
  
    const { site_details_id, status } = req.body; // Expecting site_details_id and new status in the request body
  
    try {
      // Validate the input
      if (!site_details_id || !status) {
        return res.status(400).json({ message: 'Site details ID and status are required.' });
      }
  
      // Find the existing status entry
      const existingStatus = await siteProgressStatusRepository.findOne({
        where: { site_details_id }
      });
  
      if (!existingStatus) {
        return res.status(404).json({ message: 'Site progress status not found.' });
      }
  
      // Update the status
      existingStatus.status = status; // Update the status field
  
      await siteProgressStatusRepository.save(existingStatus); // Save the changes
  
      res.status(200).json({
        message: 'Site progress status updated successfully.',
        siteProgressStatus: existingStatus
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        message: 'Error updating site progress status.',
        error: error.message
      });
    }
  };


module.exports = {
  createMission,
  linkMissionCategoryToSite,
  linkMissionDataProductToSite

};
