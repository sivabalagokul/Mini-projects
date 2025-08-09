questions = [
    {
        "question": "What is the capital of France?",
        "options": ["A. Paris", "B. London", "C. Rome", "D. Berlin"],
        "answer": "A"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["A. Earth", "B. Venus", "C. Mars", "D. Jupiter"],
        "answer": "C"
    },
    {
        "question": "What is the largest mammal?",
        "options": ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Hippopotamus"],
        "answer": "B"
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["A. Charles Dickens", "B. Mark Twain", "C. William Shakespeare", "D. Jane Austen"],
        "answer": "C"
    },
    {
        "question": "What is the square root of 64?",
        "options": ["A. 6", "B. 7", "C. 8", "D. 9"],
        "answer": "C"
    }
]

def show_question(q):
    print("\n" + q["question"])
    for option in q["options"]:
        print(option)
    answer = input("Enter your answer (A/B/C/D): ").strip().upper()
    return answer

def run_quiz():
    print("="*40)
    print("🎯 Welcome to the Quiz Game! 🎯")
    print("="*40)
    score = 0

    for q in questions:
        ans = show_question(q)
        if ans == q["answer"]:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Wrong! The correct answer was {q['answer']}.")

    print("\n" + "="*40)
    print(f"🏆 You got {score} out of {len(questions)} correct!")
    if score == len(questions):
        print("🌟 Perfect Score! You're a genius!")
    elif score >= len(questions)//2:
        print("👍 Good job! You know your stuff.")
    else:
        print("📚 Better luck next time!")

if __name__ == "__main__":
    run_quiz()
