%%
%public
%class LanguageXscanner
%standalone
%unicode
%{
//userdefined code
%}
/* regular expressions*/
Digit = [0-9]
Letter = [A-Za-z]
ID = (_|{Letter})(_|{Letter}|{Digit})*
Number=[-]?{Digit}+(\.{Digit}+(e[-\+]{Digit}+)?)?
Newline=\r|\n|\r\n|\t
ADDOP = \+
ASSIGNOP = "="
STR_Literal = \"([^\"\n])*\"
%%
if {System.out.println("IFKW");}
print {System.out.println("PRINTKW");}
while {System.out.println("WHILEKW");}
read {System.out.println("READKW");}
{ID} {System.out.println("ID="+yytext());}
{Number} {System.out.println("NUM="+yytext());}
{ADDOP} {System.out.println("ADDOP");}
{ASSIGNOP} {System.out.println("ASSIGNOP");}
. {}
<<EOF>> {System.out.println("End of Scanner");return 
0;}
[^] {return 1;}
// return 0; success
// return 1; fail


