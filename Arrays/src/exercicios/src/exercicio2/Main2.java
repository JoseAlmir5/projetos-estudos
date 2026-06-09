package exercicio2;

import java.util.Locale;
import java.util.Scanner;

public class Main2 {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Quantos números voce vai digitar? ");
        int num = sc.nextInt();

        double[] vect = new double[num];

        double soma = 0.0;
        for (int i=0; i<vect.length; i++) {
            System.out.println("Digite um número: ");
            vect[i] = sc.nextDouble();
            soma += vect[i];
        }

        System.out.print("VALORES = ");

        for (int i=0; i< vect.length; i++) {
            System.out.printf("%.1f  ", vect[i]);
        }

        System.out.printf("\nSOMA = %.2f%n", soma);
        System.out.printf("MEDIA = %.2f%n", soma / vect.length);


        sc.close();
    }
}
