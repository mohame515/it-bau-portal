%%
%{
/* idea here is to strip comments out of C code.            */
/* INITIAL is the default start state.  Comment is our new  */
/* state where we remove comments.                          */
%}
%class remove_comments
%unicode
%line
%column
%state COMMENT
%standalone
%%
<YYINITIAL>"//".*   {}
<YYINITIAL>"/*"		{yybegin(COMMENT);}
<YYINITIAL>\r		{}
<YYINITIAL>.		{System.out.print(yytext());}
<YYINITIAL>[\n]		{System.out.print(yytext());}
<COMMENT>"*/"		{yybegin(YYINITIAL);}
<COMMENT>.	        {}
<COMMENT>[\n]		{}

