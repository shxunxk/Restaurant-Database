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
    ch = int(input("1. Take customer order\n2. Check order details and status\n3.Customer details\n4. Go back\n0. Exit\n"))

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
        typ = int(input('1.Chef\n2. Waiter'))
    elif(ch == 5):
        start()
        

def customerorder():
    cust_name = input("Enter the name of the customer\n")
    cust_phone = input("Enter the phone number of the customer\n")
    cust_email = input("Enter the email of the customer\n")
    add = input("Enter the address of the customers\n")
    m = 'Y'
    order_dat = datetime.date.today()
    cur.execute('select customer_id from customers where name = %d and phone = %d and email = %d',(cust_name, cust_phone, cust_email, add))
    result = cur.fetchone()
    if(not result):
        cur.execute('insert into customers(name, phone, email, address) values(%s,%s,%s,%s)',cust_name, cust_phone, cust_email)
    else:
        cust_id = result[0]
    cur.execute('insert into orders(order_date, customer_id) values(%d, %d)',(order_dat, cust_id))
    conn.commit()
    cur.execute('select product_id, product_name from products')
    cur.fetchone()
    ord_id = cur.execute('select order_id from orders where customer_id = cust_id and order_date = order_dat')
    while(m == 'Y'):
            prod_id = int(input("Enter the item"))
            qty = int(input('Enter the quantity'))
            cur.execute('insert into items(order_id, product_id, quantity) values(%d,%d, %d)',(ord_id, prod_id, qty))
            m = input('Done (Y/N)')

def orderdetails():
    cur.execute('select * from orders')
    i = int(input('Enter the order_id\n'))
    cur.execute('select items.item_id, products.product_name, items.quatity from items join products on items.product_id = products.product_id where items.order_id=i')
    d = input('Delete the order? (Y/N)\n')
    if(d == 'Y'):
        cur.execute('select order_status_id from orders where order_id=%d',(i,))
        result = cur.fetchone()
        check = result[0]
        if(check == 1):
            cur.execute("delete from orders where order_id = %d",(i,))
            conn.commit()
        elif(check != 1):
            print('Order cannot be deleted')
        else:
            print("Enter proper input\n")
        

def customerdetails():
    cur.execute('select * from customers')
    rows = cur.fetchall()
    for row in rows:
        tem = (list(row))
        for i in tem:
            print(i,end=' ')
        print("")
    e = int(input('\n1. Edit customer details\n2. Delete customer details\n3. Manually insert customer details'))
    if(e == 2):
        iden = int(input('Enter the customer id to be deleted\n'))
        cur.execute("delete from customers where customer_id = %d",(iden,))
        conn.commit()
    if(e == 1):
        iden = int(input('Enter the customer id to be changed\n'))
        name = input("Enter the new name\n")
        phone = input("Enter the new phone number\n")
        email = input("Enter the new email\n")
        add = input("Enter the new address\n")
        cur.execute('update customers set customer_id = %d, name = %s, phone = %s, email = %s, add = %s',(iden,name,phone,email,add))
        conn.commit()

def inventorydetails():
    cur.execute('select inventory_item_id, inventory_item_name from inventory_items')
    rows=cur.fetchall()
    for row in rows:
        tem = (list(row))
        for i in tem:
            print(i,end=' ')
        print("")

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