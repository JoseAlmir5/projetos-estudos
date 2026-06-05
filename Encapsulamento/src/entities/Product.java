package entities;

public class Product {

    private String name;
    private double price;
    private int quantity;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price > 0) {
            this.price = price;
        }
    }


    public int getQuantity() {
        return quantity;
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
        return getName()
                + ", $ "
                + String.format("%.2f", getPrice())
                + ", "
                + quantity
                + " units, Total: $ "
                + String.format("%.2f", totalValueInStock());
    }

}
