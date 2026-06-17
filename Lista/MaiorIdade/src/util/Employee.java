package util;

import java.util.List;

public class Employee {

    private String nome;
    private Integer idade;

    public Employee(String nome, Integer idade) {
        this.nome = nome;
        this.idade = idade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public Integer getIdade() {
        return idade;
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

    public String toString() {
        return "Nome: "
                + nome
                + " | Idade: "
                + idade;
    }

}
