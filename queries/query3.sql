-- 3. Show customers with aggregated estimate revenue greater than $100,000
SELECT customer_id, SUM(est_revenue) AS total_revenue
FROM Opportunity
GROUP BY customer_id
HAVING total_revenue > 100000;