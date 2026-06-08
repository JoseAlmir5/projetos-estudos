package array2;

import entities.Product;

import java.util.Locale;
import java.util.Scanner;

public class Program2 {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        Product[] vect = new Product[n];

        for (int i=0; i<vect.length; i++) {
            sc.nextLine();//quebra de linha ficou pendente
            String name = sc.nextLine();
            double price = sc.nextDouble();
            vect[i] = new Product(name, price);
        }

        double soma = 0.0;
        for (int i=0; i<vect.length; i++) {
            soma += vect[i].getPrice();
        }

        double media = soma / vect.length;

        System.out.printf("Media de preço: %.2f%n", media);

        sc.close();
    }
}
