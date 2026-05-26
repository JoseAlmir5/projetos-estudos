package main;

import entities.Employee;

import java.util.Locale;
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        Employee employ = new Employee();

        System.out.println("Bem vindo caro Funcionario! Digite seus dados:");

        System.out.println("Digite seu nome: ");
        employ.nome = sc.nextLine();
        System.out.println("Digite o salário bruto: ");
        employ.salarioBruto = sc.nextDouble();
        System.out.println("Digite o seu imposto: ");
        employ.imposto = sc.nextDouble();

        System.out.printf("Seu salario liquido é de: R$ %.2f%n", employ.salarioLiquido());

        System.out.println("Quantos por cento deseja aumentar?: ");
        double percentage = sc.nextDouble();
        employ.aumentoDeSalario(percentage);

        System.out.printf("Salario atualizado: %.2f%n", employ.salarioBruto);

        sc.close();
    }

}
