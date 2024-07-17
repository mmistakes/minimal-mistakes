---
id: 109
title: Determining Oracle Materialized View usage
date: 2015-03-05T21:49:41+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=109
permalink: /determining-oracle-materialized-view-usage/
categories:
  - Uncategorized
---
We have some materialized views but are not sure they're being used after index and schema changes were made to improve performance.
<ol>
	<li>Enable auditing: <em>AUDIT SELECT ON MVIEW_NAME;</em></li>
	<li>run targeted queries</li>
	<li>Find no data in SYS.AUD$
<ol>
	<li>Table is huge so straight <em>SELECT * FROM SYS.AUD$;</em> takes too long</li>
	<li>Try to look for selects: <i>SELECT * FROM SYS.AUD$ WHERE ACTION#=3 /* SELECT from SYS.AUDIT_ACTIONS */;</i></li>
	<li>Non-relevant data found</li>
</ol>
</li>
	<li>Enable auditing on table that is commonly used: <em>AUDIT SELECT ON TABLE_NAME;</em></li>
	<li>Run some selects</li>
	<li>Still find no data in SYS.AUD$</li>
</ol>
Since auditing seems to not be working as I expected (possibly because google-whacking it wrong), try a different tack. See if the common queries being run would be rewritten with <i>dbms_mview.explain_rewrite</i> on each query.
<ol>
	<li>The REWRITE_TABLE needs to be created if not already done</li>
	<li>run <i>begin dbms_mview.explain_rewrite('&lt;the query&gt;', 'MVIEW_NAME', to_char(sysdate, 'yyyy-mm-dd-hh24:mi:ss.ssss')); end;</i></li>
	<li>Look at the results in the REWRITE_TABLE: <em>select * from rewrite_table order by 1 desc;</em></li>
</ol>

