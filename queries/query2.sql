-- 2. Select all screening records modified by 'Legal Compliance Analyst'
SELECT * FROM Screening_Record 
WHERE modified_by_id = 
    (SELECT employee_id 
     FROM Employee 
     WHERE title = 'Legal Compliance Analyst');