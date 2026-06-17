package util;

public class Pessoas {

        private String nome;

        public Pessoas(String nome) {
            this.nome = nome;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String toString() {
            return "Nome: " + nome;
        }

}
