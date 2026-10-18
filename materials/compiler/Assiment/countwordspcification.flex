%%

%class countWord
%unicode
%line
%column
%state comment
%standalone
letters=[A-Za-z]+(abb)
%{int count=0;
%}
%%
{letters} {count++;System.out.println(YYtext.length());}