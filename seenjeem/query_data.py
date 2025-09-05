import sqlite3
import json

# Connect to database
conn = sqlite3.connect('seenjeem_complete.db')
cursor = conn.cursor()

print("=== SEENJEEM DATA SUMMARY ===\n")

# Count countries
cursor.execute("SELECT COUNT(*) FROM countries")
country_count = cursor.fetchone()[0]
print(f"Total countries: {country_count}")

# Show some countries
print("\nSample countries:")
cursor.execute("SELECT name, native, capital, region FROM countries LIMIT 5")
for row in cursor.fetchall():
    print(f"- {row[0]} ({row[1]}) - Capital: {row[2]}, Region: {row[3]}")

# Count questions
cursor.execute("SELECT COUNT(*) FROM question_details")
question_count = cursor.fetchone()[0]
print(f"\n\nTotal questions: {question_count}")

# Show questions by category
print("\nQuestions by category:")
cursor.execute("""
    SELECT category_id, COUNT(*) as count 
    FROM question_details 
    GROUP BY category_id
""")
for row in cursor.fetchall():
    print(f"- Category {row[0]}: {row[1]} questions")

# Show questions by class
print("\nQuestions by difficulty class:")
cursor.execute("""
    SELECT class, COUNT(*) as count 
    FROM question_details 
    GROUP BY class
    ORDER BY class
""")
for row in cursor.fetchall():
    print(f"- {row[0]}: {row[1]} questions")

# Show all questions with details
print("\n\n=== ALL QUESTIONS ===\n")
cursor.execute("""
    SELECT question, correct_answer, class, category_id 
    FROM question_details
    ORDER BY class, question
""")

questions = cursor.fetchall()
for i, (question, answer, difficulty, category) in enumerate(questions, 1):
    print(f"{i}. [{difficulty}] {question}")
    print(f"   Answer: {answer}")
    print(f"   Category: {category}")
    print()

# Export to readable format
print("\nExporting questions to questions_export.json...")
cursor.execute("""
    SELECT id, category_id, question, question_ar, correct_answer, correct_answer_ar, 
           class, question_type_view, image_urls, video_urls, audio_urls
    FROM question_details
""")

columns = [description[0] for description in cursor.description]
questions_export = []

for row in cursor.fetchall():
    question_dict = dict(zip(columns, row))
    
    # Parse JSON fields
    if question_dict['image_urls']:
        question_dict['image_urls'] = json.loads(question_dict['image_urls'])
    if question_dict['video_urls']:
        question_dict['video_urls'] = json.loads(question_dict['video_urls'])
    if question_dict['audio_urls']:
        question_dict['audio_urls'] = json.loads(question_dict['audio_urls'])
    
    questions_export.append(question_dict)

# Save to JSON file
with open('questions_export.json', 'w', encoding='utf-8') as f:
    json.dump({
        'total_questions': len(questions_export),
        'questions': questions_export
    }, f, ensure_ascii=False, indent=2)

print(f"Exported {len(questions_export)} questions to questions_export.json")

conn.close()