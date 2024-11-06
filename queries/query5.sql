-- 5. Rank each Sales manager's opportunity by the estimate revenue in descending order
SELECT
    e. first_name || " " || e.last_name AS employee_name,
    o.name,
	o.est_revenue,
    RANK() OVER (
        PARTITION BY owner_id
        ORDER BY est_revenue DESC) revenue_rank
FROM Opportunity o
LEFT JOIN Employee e
    ON owner_id = employee_id;