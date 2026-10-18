import java.io.*; 
%% 
%class Jlex_test_main 
%unicode 
%line 
%column 
%{ 
static int id_count = 0;

public static void main(String [] args) throws IOException 
{    
     Jlex_test_main lexer = new Jlex_test_main(new FileReader(args[0]));
     lexer.yylex();      
}
%} 
%type Object    //this line changes the return type of yylex into Object
IF = if
WHILE = while 
D = [0-9]
A = (a|b|c)
ID = (_|[a-z]|[A-Z])(_|{D}|[a-z]|[A-Z])*
NUM = (\+|-)?({D})*(\.{D}*)?

%% 
{IF} {System.out.println("IF");}
{WHILE} {System.out.println("WNILE");}  
{ID} 	{System.out.println("ID"+(id_count)+":"+yytext()); id_count++; } 
{NUM}   {System.out.println("NUM:"+yytext());} 
[\n] 		{ }
. 		{ } 