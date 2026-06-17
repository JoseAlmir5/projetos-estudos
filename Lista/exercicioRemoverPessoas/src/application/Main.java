package application;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import util.Pessoas;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        List<Pessoas> list = new ArrayList<>();

        System.out.println("Quantos nome ira adicionar?: ");
        int n = sc.nextInt();
        sc.nextLine();

        for (int i=0; i<n; i++) {
            System.out.println("#: " + (i + 1));
            System.out.print("Nome: ");
            String nome = sc.nextLine();

            Pessoas pessoas = new Pessoas(nome);
            list.add(pessoas);

        }

        System.out.println();

        for (Pessoas pessoa : list) {
            System.out.println(pessoa);
        }

        System.out.println();
        System.out.println("Qual nome deseja remover?");
        String nomeRemovido = sc.nextLine();
        Integer removido = removerList(list, nomeRemovido);
        System.out.println();

        System.out.println("Nome digitado: " + nomeRemovido);

        if (removido == null) {
            System.out.println("Esse nome não existe!");
        }
        else {
            System.out.println("Posição do nome removido: " + removido);

            Pessoas removida = list.remove((int) removido);

            System.out.println("Removido: " + removida.getNome());
            System.out.println("Tamanho após remover: " + list.size());
        }

        System.out.println();
        System.out.println("=== LISTA APÓS REMOVER ===");

        for (Pessoas pessoa : list) {
            System.out.println(pessoa.getNome());
        }



        sc.close();
    }

    public static Integer removerList(List<Pessoas> list, String nome) {
        for (int i=0; i<list.size(); i++) {
            if (list.get(i).getNome().equals(nome)) {
                return i;
            }
        }
        return null;
    }
}
