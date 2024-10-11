const { getConnection } = require('typeorm');
const WorkProfile = require('./path/to/WorkProfileSchema'); // Adjust the path as necessary

// Function to create a recruitment profile
const createRecruitmentProfile = async (req, res) => {
  const connection = getConnection();
  
  try {
    // Destructure data from the request body
    const {
      job_title,
      contract_period,
      pilots_required,
      is_planned_start_date,
      planned_date,
      timeline,
      job_desc,
      send_daily_updates_to,
      email,
      customer_id,
      job_type_id,
      payment_details_id,
    } = req.body;

    // Validate required fields
    if (!job_title || !customer_id || !job_type_id || !payment_details_id) {
      return res.status(400).json({ message: 'Please provide required fields: job_title, customer_id, job_type_id, payment_details_id.' });
    }

    // Create a new WorkProfile
    const workProfileRepository = connection.getRepository(WorkProfile);
    const newWorkProfile = workProfileRepository.create({
      job_title,
      contract_period,
      pilots_required,
      is_planned_start_date,
      planned_date,
      timeline,
      job_desc,
      send_daily_updates_to,
      email,
      customer_id,
      job_type_id,
      payment_details_id,
    });

    // Save the WorkProfile
    await workProfileRepository.save(newWorkProfile);

    return res.status(201).json({
      message: 'Recruitment profile created successfully!',
      workProfile: newWorkProfile,
    });
  } catch (error) {
    console.error('Error creating recruitment profile:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  createRecruitmentProfile,
};
