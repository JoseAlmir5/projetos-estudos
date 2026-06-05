package application;

import entities.Banco;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Entre com o numero da conta: ");
        int number = sc.nextInt();
        sc.nextLine();
        System.out.println("Entre com o nome do titular da conta: ");
        String name = sc.nextLine();
        System.out.println("Deseja fazer um deposito inicial? (s/n): ");
        char opcao = sc.next().charAt(0);

        Banco banco;
        if (opcao == 's') {
            System.out.println("Entre com o valor do deposito: ");
            double saldo = sc.nextDouble();
            banco = new Banco(number, name, saldo);
        } else {
            banco = new Banco(number, name);
        }

        System.out.println();
        System.out.println("Dados da conta: ");
        System.out.println(banco);

        System.out.println();
        System.out.println("Entre com um valor para ser depositado: ");
        double novoSaldo = sc.nextDouble();
        banco.addSaldo(novoSaldo);

        System.out.println();
        System.out.println("Atualização da conta: ");
        System.out.println(banco);

        System.out.println();
        System.out.println("Insira um valor para saque: ");
        novoSaldo = sc.nextDouble();
        banco.removeSaldo(novoSaldo);

        System.out.println();
        System.out.println("Atualização da conta: ");
        System.out.println(banco);

        sc.close();
    }
}
