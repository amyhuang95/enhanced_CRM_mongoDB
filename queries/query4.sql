-- 4. Show each quote and the corresponding employee who created it
SELECT q.quote_id, q.name, e.first_name || " " || e.last_name AS employee_name
FROM Quote q
LEFT JOIN Opportunity o
    USING (opportunity_id)
LEFT JOIN Employee e
    ON o.owner_id = e.employee_id;