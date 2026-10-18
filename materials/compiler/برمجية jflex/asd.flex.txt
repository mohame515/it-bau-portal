%%
%public
%class languageX
%standalone
%unicodde
%{
//userdefined code 
%}
Digit=[0-9]
Letter = [A-Za-z]
ID = (_|{{Letter}})(_|{Letter}|{Digit})*
Number=[\+]?{Digit}+
Newline=\r|\n|\r\n|\t
Addop=\+
assignop="="
%%
if {System.out.println("Ifkw")}
print {System.out.println("prinr")}
while {System.out.println("while")}
read {System.out.println("read")}
ID {System.out.println("id=")}
Number {System.out.println("number")}
Addop {System.out.println("add")}
assignop {System.out.println("Ifkw")}
<<EOF>> {System.out.println("END SCANNER")}