
/**
 * Use Buffer
 */

/* import section*/ 
import java.io.*;
import java.util.*;

/*Definitions  RE + code */

%% 
%class LexicalAnalyser
%unicode 
%line 
%column
%type Object    //this line changes the return type of yylex into Object  
L = [a-zA-Z_]
D = [0-9]
WHITE = [ \t\r\n]

/* java code*/
%{ 
static int id_count;
static StringBuffer str; 
public static void main(String [] args) throws IOException 
{    
     LexicalAnalyser lexer = new LexicalAnalyser(new FileReader(args[0]));
     str = new StringBuffer();
     lexer.yylex(); 
     System.out.println(str.toString());
} 
%} 

/* Actions - RE-Action Pairs*/

%%
{WHITE} { /* Ignore */ }
"//".* { /* Ignore */ }
"=" { str.append("ASSIGN "+yytext());str.append("\n"); }
"==" {str.append("EQUALS "+yytext());str.append("\n");   }
"+" { str.append("PLUS "+yytext());str.append("\n");  }
"*" { str.append("MUL "+yytext());str.append("\n"); }
{L}({L}|{D})* {str.append("ID "+yytext());str.append("\n"); }
[-+]?{D}+ { str.append("INT "+yytext());str.append("\n"); }
. { System.out.println ("<ERROR>"+yytext());}