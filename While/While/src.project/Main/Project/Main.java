package Main.Project;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner teste = new Scanner(System.in);

        int x = teste.nextInt();
        int soma = 0;

        while (x != 0) { //enquanto for verdadeiro entra na condição
            soma += x;
            x = teste.nextInt();
        }

        System.out.println(soma);



        teste.close();
    }
}
