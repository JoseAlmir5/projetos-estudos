package exercicio1Vetor;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Quantos números voce vai digitar? ");
        int n = sc.nextInt();

        int[] vect = new int[n];

        for(int i=0; i<vect.length; i++) {
            System.out.println("Digite um número: ");
            vect[i] = sc.nextInt();
        }

        System.out.println("Numeros Negativos:");

        for (int i=0; i<vect.length; i++) {
            if (vect[i] < 0) {
                System.out.printf("%d%n", vect[i]);
            }
        }

        sc.close();
    }
}
