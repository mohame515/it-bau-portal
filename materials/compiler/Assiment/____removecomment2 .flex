%%

%class removecomments
%unicode
%line
%column
%state COMMENT
%standalone
%%
<YYINITIAL>"#".*   {}
<YYINITIAL>"\"\"\""		{yybegin(COMMENT);}
<YYINITIAL>\r		{}
<YYINITIAL>.		{System.out.print(yytext());}
<YYINITIAL>[\n]		{System.out.print(yytext());}
<COMMENT>"\"\"\""		{yybegin(YYINITIAL);}
<COMMENT>.	        {}
<COMMENT>[\n]		{}

