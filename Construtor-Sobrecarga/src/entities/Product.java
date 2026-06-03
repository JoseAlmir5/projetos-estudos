package entities;

public class Product {

    public String name;
    public double price;
    public int quantity;

    public Product() {

    }

    public Product(String name, double price, int quantity) { //CONSTRUTOR
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Product(String name, double price) { //Sobrecarga quanto se tem varios mais de uma operação.
        this.name = name;
        this.price = price;
        quantity = 0; // ou podemos deixar vazio pois o java adiciona valor = 0 automaticamente.
    }

    public double totalValueInStock() {
        return price * quantity;
    }
    public void addProducts(int quantity) {
        this.quantity += quantity;
    }
    public void removeProducts(int quantity) {
        this.quantity -= quantity;
    }
    public String toString() {
        return name
                + ", $ "
                + String.format("%.2f", price)
                + ", "
                + quantity
                + " units, Total: $ "
                + String.format("%.2f", totalValueInStock());
    }

}
