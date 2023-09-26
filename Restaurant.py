import psycopg2
import datetime

def start():
    print("Please select a option\n1. Front End\n2. Back End\n0. Exit")
    ch = int(input())
    if(ch == 1):
        frontend()
    elif(ch == 2):
        backend()
    elif(ch == 0):
        exit()
    else:
        print("Enter the right choice\n")
        start()

def frontend():
    ch = int(input("1. Take customer order\n2. Check order details and status\n3. Customer details\n4. Go back\n0. Exit\n"))

    if(ch==1):
        customerorder()

    elif(ch == 2):
        orderdetails()

    elif(ch == 3):
        customerdetails()
    elif(ch==0):
        exit()
    elif(ch == 4):
        start()
    else:
        print("Enter the right choice\n")
        frontend()

def backend():
    ch = int(input("1. Inventory details\n2. Food Menu\n3. Employee details\n4. Furnitures\n5. Go back\n0. Exit\n"))
    if(ch==0):
        exit()
    elif(ch==1):
        inventorydetails()
    elif(ch==2):
        foodmenu()
    elif(ch == 3):
        employeedetails()
    elif(ch == 4):
        hardwares()
    elif(ch == 5):
        start()

def customerorder():
    try:
        cust_name = input("Enter the name of the customer: ")
        cust_phone = input("Enter the phone number of the customer: ")
        cust_email = input("Enter the email of the customer: ")
        add = input("Enter the address of the customer: ")
        m = 'Y'
        order_date = datetime.date.today()

        cur.execute('SELECT customer_id FROM customers WHERE name = %s AND phone = %s AND email = %s', (cust_name, cust_phone, cust_email))
        result = cur.fetchone()

        if not result:
            cur.execute('INSERT INTO customers(name, phone, email, address) VALUES (%s, %s, %s, %s) RETURNING customer_id', (cust_name, cust_phone, cust_email, add))
            cust_id = cur.fetchone()[0]
        else:
            cust_id = result[0]

        cur.execute('INSERT INTO orders(order_date, customer_id) VALUES (%s, %s) RETURNING order_id', (order_date, cust_id))
        order_id = cur.fetchone()[0]

        cur.execute('SELECT product_id, product_name FROM products')
        cur.fetchone()

        while m == 'Y':
            prod_id = int(input("Enter the product ID: "))
            qty = int(input('Enter the quantity: '))
            cur.execute('INSERT INTO items(order_id, product_id, quantity) VALUES (%s, %s, %s)', (order_id, prod_id, qty))
            m = input('Add another item? (Y/N): ')

        conn.commit()
        print("Order placed successfully!")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

def orderdetails():
    cur.execute('SELECT * FROM orders')
    i = int(input('Enter the order_id: '))
    
    cur.execute('SELECT items.item_id, products.product_name, items.quantity FROM items JOIN products ON items.product_id = products.product_id WHERE items.order_id = %s', (i,))
    rows = cur.fetchall()
    
    if len(rows) == 0:
        print('Order not found.')
        return
    
    print('Order Details:')
    for row in rows:
        item_id, product_name, quantity = row
        print(f'Item ID: {item_id}, Product Name: {product_name}, Quantity: {quantity}')
    
    d = input('Delete the order? (Y/N): ')
    if d.upper() == 'Y':
        cur.execute("SELECT order_status_id FROM orders WHERE order_id = %s", (i,))
        result = cur.fetchone()
        if result:
            check = result[0]
            if check == 1:
                cur.execute("DELETE FROM orders WHERE order_id = %s", (i,))
                conn.commit()
                print('Order deleted successfully.')
            else:
                print('Order cannot be deleted because it has a different status.')
        else:
            print('Order not found.')
    else:
        print('Order not deleted.')
        
def customerdetails():
    cur.execute('SELECT * FROM customers')
    rows = cur.fetchall()
    
    if not rows:
        print("No customer records found.")
    else:
        print("Customer Details:")
        for row in rows:
            customer_id, name, phone, email, address = row
            print(f"Customer ID: {customer_id}")
            print(f"Name: {name}")
            print(f"Phone: {phone}")
            print(f"Email: {email}")
            print(f"Address: {address}")
            print("-" * 30)

    e = int(input('\n1. Edit customer details\n2. Delete customer details\n3. Manually insert customer details\n'))
    if e == 2:
        iden = int(input('Enter the customer id to be deleted\n'))
        cur.execute("DELETE FROM customers WHERE customer_id = %s", (iden,))
        conn.commit()
    elif e == 1:
        iden = int(input('Enter the customer id to be changed\n'))
        name = input("Enter the new name\n")
        phone = input("Enter the new phone number\n")
        email = input("Enter the new email\n")
        add = input("Enter the new address\n")
        cur.execute('UPDATE customers SET name = %s, phone = %s, email = %s, address = %s WHERE customer_id = %s', (name, phone, email, add, iden))
        conn.commit()

def inventorydetails():
    cur.execute('SELECT inventory_item_id, inventory_item_name FROM inventory_items')
    rows = cur.fetchall()
    if not rows:
        print('No inventory items found.')
        return
    print('Inventory Details:')
    for row in rows:
        inventory_item_id, inventory_item_name = row
        print(f'Inventory Item ID: {inventory_item_id}, Item Name: {inventory_item_name}')

def foodmenu():
    cur.execute('select * from products;')
    rows = cur.fetchall()
    for row in rows:
        tem = (list(row))
        for i in tem:
            print(i,end=' ')
        print("")
    print('\n1. Add item to menu\n2. Delete item from menu')
    f = int(input())
    if(f==1):
        prd = input('Enter the item name to be entered\n')
        pr = int(input('Enter the item price\n'))
        cur.execute('insert into products(product_name, unit_price) values(%s,%d);',(prd, pr))
        conn.commit()
    else:
        prd=input('Enter the item to be deleted\n')
        cur.execute('delete row products where product_name = %s',(prd,))
        conn.commit()

def employeedetails():
    cur.execute("select * from employees")
    rows = cur.fetchall()

    if not rows:
        print('No employees and currently contracted')
    else:
        for row in rows:
            print("Employee Details")
            emp_id, emp_name, pos, salary = row
            print(f"Employee ID: {emp_id}")
            print(f"Employee Name: {emp_name}")
            print(f"Employee Position: {pos}")
            print(f"Employee Salary: {salary}")

    i  = input('Enter new employee details (Y/N)\n')
    if(i == 'Y' or i=='y'):
        cur.execute("insert into employees(employee_name, position, salary) values()")
        conn.commit()
    else:
        return
    
    def hardwares():
        print('Hardware')
        cur.execute("SELECT * FROM hardwares")
        i = input("Enter new hardware details (Y/N)\n")
        ty, tot = input().split()
        tot = int(tot)
        cur.execute("insert into hardwares")
            
cur = None
conn = None

try:
    conn = psycopg2.connect(
        host = 'localhost',
        database = 'Restaurant',
        user = 'postgres',
        password = 'postgres',
        port = '5432'
    )

    cur = conn.cursor()

    print("\nOne Food World Database\n")
    start()

    conn.commit()
except Exception as error:
    print("Error")
finally:
    if conn != None:
        conn.close()
    if cur != None:
        cur.close()