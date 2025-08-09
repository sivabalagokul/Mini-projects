library = []

def show_menu():
    print("\n" + "="*40)
    print("        LIBRARY MANAGEMENT SYSTEM")
    print("="*40)
    print("1. Add Book")
    print("2. View All Books")
    print("3. Borrow Book")
    print("4. Return Book")
    print("5. Search Book")
    print("6. Exit")
    print("="*40)

def add_book():
    title = input("Enter book title: ").strip()
    author = input("Enter author name: ").strip()
    if title and author:
        library.append({"title": title, "author": author, "available": True})
        print(f" Book '{title}' by {author} added to library.")
    else:
        print(" Title and author cannot be empty.")

def view_books():
    if not library:
        print(" No books in the library.")
        return
    print("\nAvailable Books:")
    for i, book in enumerate(library, start=1):
        status = "Available" if book["available"] else "Borrowed"
        print(f"{i}. {book['title']} by {book['author']} [{status}]")

def borrow_book():
    view_books()
    if not library:
        return
    try:
        num = int(input("Enter book number to borrow: "))
        if 1 <= num <= len(library):
            if library[num-1]["available"]:
                library[num-1]["available"] = False
                print(f" You borrowed '{library[num-1]['title']}'.")
            else:
                print(" Book is already borrowed.")
        else:
            print(" Invalid book number.")
    except ValueError:
        print(" Please enter a valid number.")

def return_book():
    view_books()
    if not library:
        return
    try:
        num = int(input("Enter book number to return: "))
        if 1 <= num <= len(library):
            if not library[num-1]["available"]:
                library[num-1]["available"] = True
                print(f" You returned '{library[num-1]['title']}'.")
            else:
                print(" This book was not borrowed.")
        else:
            print(" Invalid book number.")
    except ValueError:
        print(" Please enter a valid number.")

def search_book():
    keyword = input("Enter keyword to search: ").strip().lower()
    results = [book for book in library if keyword in book["title"].lower() or keyword in book["author"].lower()]
    if results:
        print("\nSearch Results:")
        for book in results:
            status = "Available" if book["available"] else "Borrowed"
            print(f"- {book['title']} by {book['author']} [{status}]")
    else:
        print(" No books found matching your search.")

def main():
    while True:
        show_menu()
        choice = input("Choose an option (1-6): ").strip()
        if choice == "1":
            add_book()
        elif choice == "2":
            view_books()
        elif choice == "3":
            borrow_book()
        elif choice == "4":
            return_book()
        elif choice == "5":
            search_book()
        elif choice == "6":
            print(" Exiting Library Management System.")
            break
        else:
            print(" Invalid choice, please try again.")

if __name__ == "__main__":
    main()
