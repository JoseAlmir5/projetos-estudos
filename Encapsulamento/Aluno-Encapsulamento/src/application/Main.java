package application;

import util.Aluno;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        System.out.println("Digite os dados do Aluno para saber sua média...");

        System.out.print("Digite o nome do aluno: ");
        String name = sc.nextLine();
        System.out.println("Digite a nota 1: ");
        double nota1 = sc.nextDouble();
        System.out.println("Digite a nota 2: ");
        double nota2 = sc.nextDouble();
        System.out.println("Digite a nota 3: ");
        double nota3 = sc.nextDouble();

        Aluno aluno = new Aluno(name, nota1, nota2, nota3);

        System.out.println(aluno);

        sc.close();
    }
}
