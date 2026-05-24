import java.util.Locale;
import java.util.Scanner;

public class main {

    public static void main(String[] args) {

        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        //inicio - executa somente uma vez.
        //condiçao - (v): executa e volta / (f): pula fora.
        //incremento - executa toda vez depois de voltar.

        int n = sc.nextInt();

        int soma = 0;
        for (int i=0; i<n; i++) {
            int x = sc.nextInt();
            soma += x;
        }

        System.out.println(soma);

        //for (int i=4; i>=0; i--) para descer numeros 4 3 2 1 0

        sc.close();
    }
}
