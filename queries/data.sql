-- Add data to Employee table
INSERT INTO Employee (employee_id, first_name, last_name, phone, email, title, department, business_unit, hired_date, status)
VALUES 
(0, 'Placeholder', 'Employee', '000-0000', 'placeholder@company.com', 'NA', 'Sales', 'Functional', '1999-01-01', 'Inactive'), 
(1, 'Alice', 'Smith', '555-1234', 'alice.smith@company.com', 'Sales Manager', 'Sales', 'Cloud', '2021-05-10', 'Active'),
(2, 'Bob', 'Johnson', '555-2345', 'bob.johnson@company.com', 'Sales Director', 'Sales', 'AI', '2022-01-20', 'Active'),
(3, 'Charlie', 'Davis', '555-3456', 'charlie.davis@company.com', 'Sanction Analyst', 'Compliance', 'Automobile', '2020-09-15', 'Active'),
(4, 'Diana', 'Lee', '555-4567', 'diana.lee@company.com', 'Sales Executive', 'Sales', 'Cloud', '2023-04-01', 'Active'),
(5, 'Eve', 'Martinez', '555-5678', 'eve.martinez@company.com', 'Software Engineer', 'Engineering', 'AI', '2023-02-12', 'Active'), 
(6, 'Jay', 'Lin', '555-5670', 'jay.lin@company.com', 'Legal Compliance Analyst', 'Compliance', 'Functional', '2023-02-12', 'Active'),
(7, 'Zoe', 'Wang', '555-5671', 'zoe.wang@company.com', 'Software Engineer', 'Engineering', 'Cloud', '2023-02-12', 'Inactive');

INSERT INTO Employee (employee_id, first_name, last_name, phone, email, title, department, business_unit)
VALUES
(8, 'Sam', 'Chen', '555-5672', 'sam.chen@company.com', 'Software Engineer', 'Engineering', 'AI'); 


-- Add data to Customer table
INSERT INTO Customer (customer_id, owner_id, parent_entity_id, legal_entity_name, country, address, industry, type, status, date_created)
VALUES
(1, 1, NULL, 'ABC Corp', 'USA', '123 Main St, NY', 'Technology', 'Direct Customer', 'Active', '2022-01-01'),
(2, 2, NULL, 'Global Tech', 'Canada', '456 King St, Toronto', 'Healthcare', 'OEM', 'Pending Review', '2022-03-15'),
(3, 4, 1, 'Camio Solutions', 'Germany', '789 Queen St, Berlin', 'Manufacturing', 'Distributor', 'Active', '2023-05-10'),
(4, 2, NULL, 'Tech Giant', 'Japan', '101 Tokyo Rd, Tokyo', 'Automotive', 'ODM', 'Inactive', '2023-08-01'),
(5, 1, NULL, 'NextGen Solutions', 'UK', '202 London Ave, London', 'AI Solutions', 'Ecosystem Partner', 'Active', '2024-02-20');

INSERT INTO Customer (customer_id, owner_id, parent_entity_id, legal_entity_name, country, address, industry, type)
VALUES
(6, 4, 3, 'Camio Solutions - Europe', 'Germany', '789 Queen St, Berlin', 'Manufacturing', 'Distributor');

-- Add Screening Record table
INSERT INTO Screening_Record (screening_record_id, modified_by_id, customer_id, issue_type, status, source, pending_action, date_created, date_updated)
VALUES
(1, 3, 1, 'Sanction', 'Approved', 'Internal Review', '', '2023-01-01', '2023-01-05'),
(2, 3, 2, 'Sanction', 'Not Approved', 'Goverment sanction', '', '2023-03-01', '2023-03-10'),
(3, 6, 3, 'Legal', 'Approved', 'Internal Review', '', '2023-06-01', '2023-06-05'),
(4, 6, 4, 'Legal', 'Not Approved', 'Internal Review', 'Missing registration document', '2023-09-01', '2023-09-05'),
(5, 6, 5, 'Legal', 'Approved', 'Internal Review', '', '2024-02-01', '2024-02-10');

INSERT INTO Screening_Record (screening_record_id, modified_by_id, customer_id, issue_type, status, source, pending_action, date_updated)
VALUES
(6, 6, 3, 'Finance', 'Approved', 'Internal Review', '', '2023-06-05');

-- Add data to Contact table
INSERT INTO Contact (contact_id, first_name, last_name, phone, email, title, organization)
VALUES
(1, 'John', 'Doe', '555-1234', 'john.doe@acme.com', 'CTO', 'ABC Corp'),
(2, 'Jane', 'Smith', '555-2345', 'jane.smith@globaltech.com', 'CEO', 'Global Tech'),
(3, 'Michael', 'Brown', '555-3456', 'michael.brown@innovative.com', 'COO', 'Innovative Solutions'),
(4, 'Linda', 'Taylor', '555-4567', 'linda.taylor@techdynamics.jp', 'VP of Sales', 'Tech Dynamics'),
(5, 'David', 'White', '555-5678', 'david.white@nextgen.com', 'Chief Engineer', 'NextGen Solutions');

-- Add data to Lead table
INSERT INTO Lead (lead_id, name, country, status, probability, source, analysis, date_created, owner_id, contact_id)
VALUES
(1, 'Acme - AI Summit', 'USA', 'Pending Review', 0.7, 'Website', 'Promising lead from demo request','2023-01-04', 1, 1),
(2, 'Global Tech', 'Canada', 'Qualified', 0.85, 'Referral', 'Strong potential in AI', '2024-09-15', 2, 2),
(3, 'Innovative AI Conference', 'Germany', 'Pending Review', 0.5, 'Trade Show', 'Initial interest in cloud services', '2024-10-01', 4, 3),
(4, 'Tech Dynamics', 'Japan', 'Cancelled', 0.2, 'Cold Call', 'Low engagement during follow-up', '2024-09-05', 4, 4),
(5, 'NextGen Solutions', 'UK', 'Qualified', 0.9, 'Email Campaign', 'Very interested in automotive AI solutions', '2024-09-22', 4, 5);

INSERT INTO Lead (lead_id, name, country, status, probability, source, analysis, owner_id, contact_id)
VALUES
(6, 'Acme - Cloud Migration', 'USA', 'Pending Review', 0.8, 'Website', 'Interested in cloud migration services', 1, 1);

-- Add data to Customer_Contact table
INSERT INTO Customer_Contact (customer_id, contact_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Add data to Opportunity table
INSERT INTO Opportunity (opportunity_id, customer_id, sold_to_id, owner_id, name, start_date, close_date, stage, est_revenue, date_created)
VALUES
(1, 3, 1, 1, 'Cloud Migration Project', '2023-01-15', '2023-06-01', 'Closed-Won', 250000.00, '2023-01-01'),
(2, 3, 1, 2, 'AI Integration for Healthcare', '2023-02-10', '2023-08-15', 'Closed-Won', 500000.00, '2023-02-01'),
(3, 3, 1, 2, 'Manufacturing Automation', '2023-05-05', '2024-01-20', 'Develop', 750000.00, '2023-05-01'),
(4, 5, 5, 4, 'Automotive Design ODM', '2023-09-01', '2024-03-01', 'Propose', 1000000.00, '2023-09-01'),
(5, 5, 5, 4, 'AI Partnership with NextGen', '2024-01-15', '2024-06-01', 'Create', 1250000.00, '2024-01-01');

INSERT INTO Opportunity (opportunity_id, customer_id, sold_to_id, owner_id, name, start_date, close_date, est_revenue)
VALUES
(6, 3, 1, 1, 'Cloud Migration Project', '2023-01-15', '2023-06-01', 250000.00);

-- Add data to Quote table
INSERT INTO Quote (quote_id, opportunity_id, bill_to_id, ship_to_id, name, content, status, date_created, date_approved)
VALUES
(1, 1, 1, 3, 'Cloud Migration Quote', 'Details on cloud services', 'Approved', '2023-02-01', '2023-02-10'),
(2, 2, 1, 3, 'AI Healthcare Quote', 'AI Integration for Healthcare Systems', 'Approved', '2023-03-01', '2023-03-10'),
(3, 3, 1, 3, 'Manufacturing Automation Quote', 'Automation for Manufacturing Lines', 'Draft', '2023-06-15', NULL),
(4, 4, 4, 5, 'Automotive ODM Quote', 'Design for Automotive ODM', 'Pending Review', '2023-10-01', NULL),
(5, 5, 4, 5, 'AI Partnership Quote', 'Partnership for AI Solutions', 'Draft', '2024-02-01', NULL);

INSERT INTO Quote (quote_id, opportunity_id, bill_to_id, ship_to_id, name, content, date_approved)
VALUES
(6, 1, 1, 3, 'Cloud Migration Quote', 'Details on cloud services', NULL);