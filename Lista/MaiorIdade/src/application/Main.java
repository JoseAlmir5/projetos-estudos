package application;

import util.Employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        List<Employee> list = new ArrayList<>();

        System.out.println("Quantas pessoas tera que cadastrar?: ");
        int n = sc.nextInt();


        for (int i = 0; i < n; i++) {

            System.out.println("Usuario #: " + (i + 1));
            System.out.print("Digite seu nome: ");
            sc.nextLine();
            String nome = sc.nextLine();
            System.out.print("Digite sua idade: ");
            Integer idade = sc.nextInt();

            Employee emp = new Employee(nome, idade);
            list.add(emp);
        }

        System.out.println();
        System.out.println("===================");
        for (Employee emp : list) {
            System.out.println(emp);
        }
        System.out.println("===================");


        System.out.println();
        System.out.print("Digite uma idade: ");
        int idadePrograma = sc.nextInt();

        System.out.println();
        System.out.println("Pessoas com idade maior que a digitada:");
        maiorIdade(list, idadePrograma);

        sc.close();
    }

    public static void maiorIdade(List<Employee> list, int idadePrograma) {

        boolean encontrou = false;

        for (Employee emp : list) {
            if (emp.getIdade() > idadePrograma) {
                System.out.println(emp);
                encontrou = true;
            }
        }

        if (!encontrou) {
            System.out.println("Nenhuma pessoa encontrada.");
        }
    }

}
