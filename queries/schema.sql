-- Employee table
CREATE TABLE Employee (
    employee_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    title TEXT,
    department TEXT CHECK(department IN ('Sales', 'Engineering', 'Compliance')),
    business_unit TEXT CHECK(business_unit IN ('Cloud', 'Automobile', 'AI', 'Functional')),
    hired_date DATE DEFAULT CURRENT_DATE,
    status TEXT CHECK(status IN ('Active', 'Inactive')) DEFAULT 'Active'
);

-- Contact table
CREATE TABLE Contact (
    contact_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    title TEXT,
    organization TEXT
);

-- Lead table
CREATE TABLE Lead (
    lead_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    status TEXT CHECK(status IN ('Pending Review', 'Qualified', 'Cancelled')) DEFAULT 'Pending Review',
    probability REAL,
    source TEXT,
    analysis TEXT,
    date_created DATE DEFAULT CURRENT_DATE,
    owner_id INTEGER,
    contact_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (contact_id) REFERENCES Contact(contact_id)
);

-- Customer table
CREATE TABLE Customer (
    customer_id INTEGER PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    parent_entity_id INTEGER,
    legal_entity_name TEXT NOT NULL,
    country TEXT,
    address TEXT,
    industry TEXT,
    type TEXT CHECK(type IN ('Direct Customer', 'ODM', 'OEM', 'Distributor', 'Ecosystem Partner')),
    status TEXT CHECK(status IN ('Active', 'Inactive', 'Pending Review')) DEFAULT 'Pending Review',
    date_created DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (owner_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (parent_entity_id) REFERENCES Customer(customer_id)
);

-- Customer_Contact table
CREATE TABLE Customer_Contact (
    customer_id INTEGER,
    contact_id INTEGER,
    PRIMARY KEY (customer_id, contact_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (contact_id) REFERENCES Contact(contact_id)
);

-- Opportunity table
CREATE TABLE Opportunity (
    opportunity_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    sold_to_id INTEGER,
    owner_id INTEGER,
    name TEXT NOT NULL,
    start_date DATE,
    close_date DATE,
    stage TEXT CHECK(stage IN ('Create', 'Develop', 'Propose', 'Closed-Won', 'Closed-Lost')) DEFAULT 'Create',
    est_revenue REAL,
    date_created DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (sold_to_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (owner_id) REFERENCES Employee(employee_id)
);

-- Quote table
CREATE TABLE Quote (
    quote_id INTEGER PRIMARY KEY,
    opportunity_id INTEGER,
    bill_to_id INTEGER,
    ship_to_id INTEGER,
    name TEXT NOT NULL,
    content TEXT,
    status TEXT CHECK(status IN ('Draft', 'Pending Review', 'Approved', 'Rejected', 'Canceled')) DEFAULT 'Draft',
    date_created DATE DEFAULT CURRENT_DATE,
    date_approved DATE,
    FOREIGN KEY (opportunity_id) REFERENCES Opportunity(opportunity_id),
    FOREIGN KEY (bill_to_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (ship_to_id) REFERENCES Customer(customer_id)
);

-- Screening_Record table
CREATE TABLE Screening_Record (
    screening_record_id INTEGER PRIMARY KEY,
    modified_by_id INTEGER,
    customer_id INTEGER,
    issue_type TEXT CHECK(issue_type IN ('Finance', 'Sanction', 'Legal')),
    status TEXT,
    source TEXT,
    pending_action TEXT,
    date_created DATE DEFAULT CURRENT_DATE,
    date_updated DATE,
    FOREIGN KEY (modified_by_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);