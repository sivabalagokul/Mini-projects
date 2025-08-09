import random
rooms = {
    "entrance": {
        "desc": "You are at the entrance of a dark cave.",
        "paths": {"north": "hall"}
    },
    "hall": {
        "desc": "A dimly lit hall. You hear noises.",
        "paths": {"south": "entrance", "east": "treasure", "west": "monster"}
    },
    "treasure": {
        "desc": "A glittering room filled with gold!",
        "paths": {"west": "hall"}
    },
    "monster": {
        "desc": "A hungry monster blocks your way!",
        "paths": {"east": "hall"}
    }
}

inventory = []
game_over = False
current_room = "entrance"

def show_room(room):
    print("\n" + rooms[room]["desc"])
    print("Exits:", ", ".join(rooms[room]["paths"].keys()))

def move(direction):
    global current_room
    if direction in rooms[current_room]["paths"]:
        current_room = rooms[current_room]["paths"][direction]
    else:
        print("❌ You can't go that way.")

def monster_encounter():
    print("👹 The monster growls at you!")
    action = input("Fight or Run? ").strip().lower()
    if action == "fight":
        if "sword" in inventory:
            print("⚔ You slay the monster!")
            rooms["monster"]["desc"] = "The monster lies defeated."
        else:
            print("💀 You have no weapon... The monster eats you.")
            return True
    else:
        move("east")
    return False

def treasure_room():
    print("💰 You found treasure!")
    if "gold" not in inventory:
        inventory.append("gold")
    print("🎉 You win the game!")
    return True

def find_item():
    items = ["sword", "shield", None]
    found = random.choice(items)
    if found and found not in inventory:
        print(f"🔍 You found a {found}!")
        inventory.append(found)

def main():
    global game_over
    print("🏰 Welcome to the Adventure Game!")
    while not game_over:
        show_room(current_room)
        if current_room == "monster":
            game_over = monster_encounter()
        elif current_room == "treasure":
            game_over = treasure_room()
        else:
            find_item()

        if game_over:
            print("🎮 Game Over.")
            break

        cmd = input("Move (north/south/east/west) or Quit: ").strip().lower()
        if cmd == "quit":
            print("👋 Thanks for playing!")
            break
        move(cmd)

if __name__ == "__main__":
    main()
