const { EntitySchema } = require('typeorm');

const customer = new EntitySchema({
  name: 'Customer', // Name of the entity
  tableName: 'customer', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    user_id: {
      type: 'bigint',
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true
    },
    profile_pic: {
      type: 'text',
      nullable: true
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    user: {
      target: 'User', // Reference to the User entity
      type: 'one-to-one',
      joinColumn: { name: 'user_id' }
    }
  }
});




const CustomerAddress = new EntitySchema({
  name: 'CustomerAddress', // Name of the entity
  tableName: 'customer_address', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    address: {
      type: 'text',
    },
    address_type: {
      type: 'enum',
      enum: ['Home', 'Work', 'Other'], // Define your enum values
    },
    customer_id: {
      type: 'bigint',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to the Customer entity
      type: 'many-to-one', // Many addresses can belong to one customer
      joinColumn: { name: 'customer_id' }
    }
  }
});


const { EntitySchema } = require('typeorm');

const customerRole = new EntitySchema({
  name: 'CustomerRoles', // Name of the entity
  tableName: 'customer_roles', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    role_name: {
      type: 'enum',
      enum: ['Admin', 'User', 'Guest'], // Define your enum values
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});

const { EntitySchema } = require('typeorm');

const CustomerRolesRelation = new EntitySchema({
  name: 'CustomerRolesRelation', // Name of the entity
  tableName: 'customer_roles_relation', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    customer_id: {
      type: 'bigint',
    },
    roles_id: {
      type: 'bigint',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to Customer entity
      type: 'many-to-one', // Many relations can belong to one customer
      joinColumn: { name: 'customer_id' }
    },
    roles: {
      target: 'CustomerRoles', // Reference to CustomerRoles entity
      type: 'many-to-one', // Many relations can belong to one role
      joinColumn: { name: 'roles_id' }
    }
  }
});


const { EntitySchema } = require('typeorm');

const customerBuisnessDetail = new EntitySchema({
  name: 'BusinessDetails', // Name of the entity
  tableName: 'business_details', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    business_name: {
      type: 'varchar',
      length: 255
    },
    gst_number: {
      type: 'varchar',
      length: 50
    },
    team_size: {
      type: 'int',
    },
    country: {
      type: 'varchar',
      length: 255
    },
    state: {
      type: 'varchar',
      length: 255
    },
    city: {
      type: 'varchar',
      length: 255
    },
    customer_id: {
      type: 'bigint',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to the Customer entity
      type: 'many-to-one', // Many business details can belong to one customer
      joinColumn: { name: 'customer_id' }
    }
  }
});






const shootRequest = new EntitySchema({
    name: 'ShootRequests', // Name of the entity
    tableName: 'shoot_requests', // Table name in the database
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: 'increment'
      },
      customer_id: {
        type: 'bigint'
      },
      service_id: {
        type: 'bigint'
      },
      address_id: { // New foreign key column for address
        type: 'bigint'
      },
      plan_type: {
        type: 'enum',
        enum: ['Basic', 'Premium', 'Enterprise'], // Define enum values for plan types
      },
      created_at: {
        type: 'timestamp',
        createDate: true,
        default: () => 'CURRENT_TIMESTAMP'
      },
      updated_at: {
        type: 'timestamp',
        updateDate: true,
        default: () => 'CURRENT_TIMESTAMP'
      }
    },
    relations: {
      customer: {
        target: 'Customer', // Reference to the Customer entity
        type: 'many-to-one', // Many shoot requests can belong to one customer
        joinColumn: { name: 'customer_id' }
      },
      service: {
        target: 'Service', // Reference to the Service entity
        type: 'many-to-one', // Many shoot requests can belong to one service
        joinColumn: { name: 'service_id' }
      },
      address: { // New relation for address
        target: 'Address', // Reference to the Address entity
        type: 'many-to-one', // Many shoot requests can belong to one address
        joinColumn: { name: 'address_id' }
      },
      status: {
        target: 'ShootStatus',
        type: 'many-to-one',
        joinColumn: { name: 'status_id' } 
      }
    }
  });
  

const { EntitySchema } = require('typeorm');

const ShootPaymentDetails = new EntitySchema({
  name: 'ShootPaymentDetails', // Name of the entity
  tableName: 'shoot_payment_details', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    customer_id: {
      type: 'bigint'
    },
    shoot_request_id: {
      type: 'bigint'
    },
    amount: {
      type: 'decimal',
      precision: 10,
      scale: 2
    },
    payment_id: {
      type: 'varchar',
      length: 255
    },
    status: {
      type: 'enum',
      enum: ['Pending', 'Completed', 'Failed'], // Define enum values for payment status
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to the Customer entity
      type: 'many-to-one', // Many payment details can belong to one customer
      joinColumn: { name: 'customer_id' }
    },
    shoot_request: {
      target: 'ShootRequests', // Reference to the ShootRequests entity
      type: 'many-to-one', // Many payment details can belong to one shoot request
      joinColumn: { name: 'shoot_request_id' }
    }
  }
});

const { EntitySchema } = require('typeorm');

const ShootAdditionalServices = new EntitySchema({
  name: 'ShootAdditionalServices', // Name of the entity
  tableName: 'shoot_additional_services', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    shoot_requests_id: {
      type: 'bigint'
    },
    additional_service: {
      type: 'varchar',
      length: 255
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    shoot_request: {
      target: 'ShootRequests', // Reference to the ShootRequests entity
      type: 'many-to-one', // Many additional services can belong to one shoot request
      joinColumn: { name: 'shoot_requests_id' }
    }
  }
});


const { EntitySchema } = require('typeorm');

const ShootRequestStatus = new EntitySchema({
  name: 'ShootRequestStatus', // Name of the entity
  tableName: 'shoot_request_status', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    shoot_request_id: {
      type: 'bigint'
    },
    status_id: {
      type: 'bigint'
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    shoot_request: {
      target: 'ShootRequests', // Reference to the ShootRequests entity
      type: 'many-to-one', // Many statuses can belong to one shoot request
      joinColumn: { name: 'shoot_request_id' }
    },
    status: {
      target: 'Status', // Reference to the Status entity (define this entity separately)
      type: 'many-to-one', // Many shoot request statuses can belong to one status
      joinColumn: { name: 'status_id' }
    }
  }
});


const { EntitySchema } = require('typeorm');

const ShootStatus = new EntitySchema({
  name: 'ShootStatus', // Name of the entity
  tableName: 'shoot_status', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    status_name: {
      type: 'enum',
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], // Define enum values for shoot status
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});




const mission = new EntitySchema({
  name: 'Mission', // Name of the entity
  tableName: 'mission', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    customer_id: {
      type: 'bigint'
    },
    mission_type: {
      type: 'enum',
      enum: ['Type1', 'Type2', 'Type3'], // Define enum values for mission types
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to the Customer entity
      type: 'many-to-one', // Many missions can belong to one customer
      joinColumn: { name: 'customer_id' }
    }
  }
});




const missionSiteDetail = new EntitySchema({
  name: 'missionSiteDetail', // Name of the entity
  tableName: 'mission_site_detail', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    address: {
      type: 'text'
    },
    country: {
      type: 'varchar',
      length: 255
    },
    state: {
      type: 'varchar',
      length: 255
    },
    city: {
      type: 'varchar',
      length: 255
    },
    zip: {
      type: 'varchar',
      length: 20
    },
    latitude: {
      type: 'decimal',
      precision: 10,
      scale: 7
    },
    longitude: {
      type: 'decimal',
      precision: 10,
      scale: 7
    },
    mission_id: {
      type: 'bigint'
    },
    site_contact_id: {
      type: 'bigint'
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    mission: {
      target: 'Mission', // Reference to the Mission entity
      type: 'many-to-one', // Many site details can belong to one mission
      joinColumn: { name: 'mission_id' }
    },
    site_contact: {
      target: 'SiteContact', // Reference to the SiteContact entity (define this entity separately)
      type: 'many-to-one', // Many site details can belong to one site contact
      joinColumn: { name: 'site_contact_id' }
    }
  }
});

const missionSiteContactDetails = new EntitySchema({
    name: 'missionSiteContactDetails', // Name of the entity
    tableName: 'mission_site_contact_details', // Name of the database table
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: true, // Auto-increment
      },
      name: {
        type: 'varchar',
        length: 255,
        nullable: true,
      },
      organization: {
        type: 'varchar',
        length: 255,
        nullable: true,
      },
      phone_number: {
        type: 'varchar',
        length: 50,
        nullable: true,
      },
      email: {
        type: 'varchar',
        length: 255,
        nullable: true,
      },
      created_at: {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      },
    },
  });


const missionArea = new EntitySchema({
  name: 'missionArea', // Name of the entity
  tableName: 'mission_area', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    kml_data: {
      type: 'text'
    },
    site_details_id: {
      type: 'bigint'
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    siteDetails: {
      target: 'SiteDetails', // Reference to the SiteDetails entity
      type: 'many-to-one', // Many KML data entries can belong to one site detail
      joinColumn: { name: 'site_details_id' }
    }
  }
});








const missionCategory = new EntitySchema({
  name: 'MissionCategory', // Name of the entity
  tableName: 'mission_category', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    category_name: {
      type: 'varchar',
      length: 255
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});



const SiteMissionCategoryRelation = new EntitySchema({
  name: 'SiteMissionCategoryRelation', // Name of the entity
  tableName: 'site_mission_category_relation', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    category_id: {
      type: 'bigint'
    },
    site_details_id: {
      type: 'bigint'
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    category: {
      target: 'MissionCategory', // Reference to the MissionCategory entity
      type: 'many-to-one', // Many relations can belong to one category
      joinColumn: { name: 'category_id' }
    },
    siteDetails: {
      target: 'SiteDetails', // Reference to the SiteDetails entity
      type: 'many-to-one', // Many relations can belong to one site detail
      joinColumn: { name: 'site_details_id' }
    }
  }
});



const SiteDataProductsRelation = new EntitySchema({
  name: 'SiteDataProductsRelation', // Name of the entity
  tableName: 'site_data_products_relation', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    data_products_id: {
      type: 'bigint'
    },
    site_details_id: {
      type: 'bigint'
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    dataProduct: {
      target: 'DataProducts', // Reference to the DataProducts entity
      type: 'many-to-one', // Many relations can belong to one data product
      joinColumn: { name: 'data_products_id' }
    },
    siteDetails: {
      target: 'SiteDetails', // Reference to the SiteDetails entity
      type: 'many-to-one', // Many relations can belong to one site detail
      joinColumn: { name: 'site_details_id' }
    }
  }
});



const MissionDataProducts = new EntitySchema({
  name: 'MissionDataProducts', // Name of the entity
  tableName: 'mission_data_products', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    data_products: {
      type: 'varchar',
      length: 255
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});




const SiteProgressStatus = new EntitySchema({
    name: 'SiteProgressStatus', // Name of the entity
    tableName: 'site_progress_status', // Table name in the database
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: 'increment' // Auto-increment for primary key
      },
      site_details_id: {
        type: 'bigint', // Foreign key to the SiteDetails table
        nullable: false // Not nullable if it's a required foreign key
      },
      status: {
        type: 'enum', // Define an enum for status
        enum: ['Pending', 'In Progress', 'Completed', 'On Hold'], // Define your status options here
        nullable: false // Not nullable
      },
      created_at: {
        type: 'timestamp',
        createDate: true,
        default: () => 'CURRENT_TIMESTAMP' // Automatically set the timestamp when created
      }
    },
    relations: {
      siteDetails: {
        target: 'SiteDetails', // Reference to the SiteDetails entity
        type: 'many-to-one', // Many progress statuses can belong to one site detail
        joinColumn: { name: 'site_details_id' } // The foreign key column in this table
      }
    }
  });
  




const workProfile = new EntitySchema({
  name: 'workProfile',
  tableName: 'work_profile', 
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    job_title: {
      type: 'varchar',
      length: 255
    },
    contract_period: {
      type: 'varchar',
      length: 255
    },
    pilots_required: {
      type: 'int'
    },
    is_planned_start_date: {
      type: 'boolean',
    },
    planned_date: {
      type: 'date',
      nullable: true
    },
    timeline: {
      type: 'text',
      nullable: true
    },
    job_desc: {
      type: 'text',
      nullable: true
    },
    send_daily_updates_to: {
      type: 'bigint',
    },
    email: {
      type: 'varchar',
      length: 255
    },
    customer_id: {
      type: 'bigint',
    },
    job_type_id: {
      type: 'bigint',
    },
    payment_details_id: {
      type: 'bigint',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
  relations: {
    customer: {
      target: 'Customer', // Reference to the Customer entity
      type: 'many-to-one', // Many work details can belong to one customer
      joinColumn: { name: 'customer_id' }
    },
    job_type: {
      target: 'JobType', // Reference to JobType entity
      type: 'many-to-one', // Many work details can belong to one job type
      joinColumn: { name: 'job_type_id' }
    },
    payment_details: {
      target: 'PaymentDetails', // Reference to PaymentDetails entity
      type: 'many-to-one', // Many work details can belong to one payment details
      joinColumn: { name: 'payment_details_id' }
    }
  }
});







const jobType = new EntitySchema({
  name: 'JobType', // Name of the entity
  tableName: 'job_type', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment'
    },
    type: {
      type: 'enum',
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'], // Define your enum values for job types
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});


const PaymentDetails = new EntitySchema({
    name: 'PaymentDetails', // Name of the entity
    tableName: 'payment_details', // Table name in the database
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: 'increment' // Auto-increment for the ID
      },
      payby: {
        type: 'enum',
        enum: ['CreditCard', 'DebitCard', 'PayPal', 'BankTransfer'], // Enum values for payment method
      },
      minimum: {
        type: 'decimal',
        precision: 10,
        scale: 2, 
      },
      maximum: {
        type: 'decimal',
        precision: 10,
        scale: 2, 
      },
      rate: {
        type: 'enum',
        enum: ['FlatRate', 'Percentage'], // Enum values for payment rate type
      },
      created_at: {
        type: 'timestamp',
        createDate: true, // Automatically set on creation
        default: () => 'CURRENT_TIMESTAMP' // Default value is current timestamp
      },
      updated_at: {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', // Default value for update timestamp
        onUpdate: 'CURRENT_TIMESTAMP' // Automatically update on modification
      }
    }
  });

  const { EntitySchema } = require('typeorm');

const PaymentBenefits = new EntitySchema({
  name: 'PaymentBenefits', // Name of the entity
  tableName: 'payment_benefits', // Table name in the database
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment' // Auto-increment for the ID
    },
    benefit: {
      type: 'enum',
      enum: ['CashBack', 'LoyaltyPoints', 'Discount', 'Insurance'], // Enum values for payment benefits
    },
    created_at: {
      type: 'timestamp',
      createDate: true, // Automatically set on creation
      default: () => 'CURRENT_TIMESTAMP' // Default value is current timestamp
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', // Default value for update timestamp
      onUpdate: 'CURRENT_TIMESTAMP' // Automatically update on modification
    }
  }
});


const SupplementalPay = new EntitySchema({
    name: 'SupplementalPay',
    tableName: 'supplemental_pay', 
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: 'increment' 
      },
      supplemental_pay: {
        type: 'enum',
        enum: ['Bonus', 'Overtime', 'Commission', 'HazardPay'], 
      },
      created_at: {
        type: 'timestamp',
        createDate: true,
        default: () => 'CURRENT_TIMESTAMP' 
      },
      updated_at: {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP' 
      }
    }
  });
