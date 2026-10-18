import java.io.*; 
%% 
%class Lexical_analyzer 
%unicode 
%line 
%column 
//%standalone
%{ 
static int charCount = 0, wordCount = 0, lineCount = 0; 
public static void main(String [] args) throws IOException 
{ 
     Lexical_analyzer lexer = new Lexical_analyzer(new FileReader(args[0]));
     lexer.yylex(); 
     System.out.println("Characters: " + charCount + 
                " Words: " + wordCount +" Lines: " +lineCount); 
} 
%} 
%type Object    //this line changes the return type of yylex into Object 
word = [^ \t\n]+ 
%% 
{word} 	{wordCount++; charCount += yytext().length(); } 
[\n] 		{charCount++; lineCount++; }
. 		{charCount++; } 
