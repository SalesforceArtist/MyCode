String s = '"Salesforcekings.blogspot.in <BR>"';
System.debug('Before Escape:'+s);
String escapeString = s.escapeHtml4();
System.debug('After Escape:'+escapeString);


String escapedString = '&quot;Salesforcekings.blogspot.in &lt;BR&gt;&quot;';
System.debug('Escaped String:  '+escapedString);
String unescapeString = escapedString.unescapeHtml4();
System.debug('Unescaped String:  '+unescapeString);
