students = []

def add_student():
    roll = input("Enter Roll Number: ").strip()
    name = input("Enter Name: ").strip()
    age = input("Enter Age: ").strip()
    grade = input("Enter Grade: ").strip()
    
    student = {"Roll": roll, "Name": name, "Age": age, "Grade": grade}
    students.append(student)
    print("Student added successfully!")

def view_students():
    if not students:
        print("⚠ No student records found.")
        return
    print("\n--- Student Records ---")
    print(f"{'Roll':<10} {'Name':<20} {'Age':<5} {'Grade':<5}")
    for s in students:
        print(f"{s['Roll']:<10} {s['Name']:<20} {s['Age']:<5} {s['Grade']:<5}")
    print()

def search_student():
    roll = input("Enter Roll Number to search: ").strip()
    for s in students:
        if s['Roll'] == roll:
            print(f"Found: {s}")
            return
    print("Student not found.")

def update_student():
    roll = input("Enter Roll Number to update: ").strip()
    for s in students:
        if s['Roll'] == roll:
            s['Name'] = input("Enter new Name: ").strip()
            s['Age'] = input("Enter new Age: ").strip()
            s['Grade'] = input("Enter new Grade: ").strip()
            print("Student record updated.")
            return
    print("Student not found.")

def delete_student():
    roll = input("Enter Roll Number to delete: ").strip()
    for s in students:
        if s['Roll'] == roll:
            students.remove(s)
            print("Student record deleted.")
            return
    print("Student not found.")

def menu():
    while True:
        print("\n===== Student Database Menu =====")
        print("1. Add Student")
        print("2. View All Students")
        print("3. Search Student")
        print("4. Update Student")
        print("5. Delete Student")
        print("0. Exit")

        choice = input("Enter your choice: ").strip()

        if choice == "1":
            add_student()
        elif choice == "2":
            view_students()
        elif choice == "3":
            search_student()
        elif choice == "4":
            update_student()
        elif choice == "5":
            delete_student()
        elif choice == "0":
            print(" Exiting... Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    menu()
