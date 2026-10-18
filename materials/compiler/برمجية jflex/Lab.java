
package lab;

import java.util.ArrayList;
import java.util.Scanner;
//import javax.swing.JOptionPane;


public class Lab {

    
    public static void main(String[] args) {
        Scanner scanner=new Scanner(System.in);
  
        ArrayList<Integer> obd=new ArrayList<Integer>();
        obd.add(10);
        obd.add(4);
        obd.add(2);
        obd.add(30);
        obd.add(17);
        obd.add(55);
        obd.add(27);
        obd.add(19);
        obd.add(0,200);
        obd.get(2);
        obd.set(1, 77);
        obd.remove(3);
        System.out.println(obd);
System.out.println(obd.contains(55));
        

        
        
        
        
    }
    
}
