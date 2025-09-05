import json
import os
from datetime import datetime

class ContinuousExpander:
    def __init__(self):
        # Load existing expanded data
        with open('output/sho6sho6_extracted_data.json', 'r', encoding='utf-8') as f:
            self.data = json.load(f)
            
        self.question_counter = len(self.data['questions'])
        print(f"Current database has {self.question_counter} questions")
        
    def add_more_questions(self):
        """Add another batch of questions to each category"""
        
        # Additional History questions
        history_questions = [
            {
                "question": "متى كانت معركة القادسية؟",
                "answer": "15 هجري",
                "options": ["13 هجري", "14 هجري", "15 هجري", "16 هجري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو مؤسس الدولة الأموية؟",
                "answer": "معاوية بن أبي سفيان",
                "options": ["عمر بن عبد العزيز", "معاوية بن أبي سفيان", "عبد الملك بن مروان", "يزيد بن معاوية"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم سنة دام حكم الدولة العثمانية؟",
                "answer": "600 سنة تقريباً",
                "options": ["400 سنة", "500 سنة", "600 سنة تقريباً", "700 سنة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو آخر خلفاء الدولة العباسية؟",
                "answer": "المستعصم بالله",
                "options": ["المستنصر بالله", "المستعصم بالله", "الظاهر بأمر الله", "المستكفي بالله"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "في أي عام وقعت نكبة فلسطين؟",
                "answer": "1948",
                "options": ["1946", "1947", "1948", "1949"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Geography questions  
        geography_questions = [
            {
                "question": "ما هي عاصمة المغرب؟",
                "answer": "الرباط",
                "options": ["الدار البيضاء", "الرباط", "فاس", "مراكش"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد محافظات الكويت؟",
                "answer": "6 محافظات",
                "options": ["4 محافظات", "5 محافظات", "6 محافظات", "7 محافظات"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "أين يقع جبل طويق؟",
                "answer": "السعودية",
                "options": ["الأردن", "السعودية", "عُمان", "اليمن"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أطول نهر في الوطن العربي؟",
                "answer": "نهر النيل",
                "options": ["نهر الفرات", "نهر دجلة", "نهر النيل", "نهر الأردن"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم مضيق يربط بين البحر الأحمر والمحيط الهندي؟",
                "answer": "مضيق باب المندب",
                "options": ["مضيق هرمز", "مضيق باب المندب", "مضيق جبل طارق", "قناة السويس"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Science questions
        science_questions = [
            {
                "question": "ما هي أكبر غدة في جسم الإنسان؟",
                "answer": "الكبد",
                "options": ["البنكرياس", "الكبد", "الغدة الدرقية", "الغدة النخامية"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم قلباً للأخطبوط؟",
                "answer": "3 قلوب",
                "options": ["قلب واحد", "قلبان", "3 قلوب", "4 قلوب"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو الغاز الأكثر وفرة في الغلاف الجوي؟",
                "answer": "النيتروجين",
                "options": ["الأكسجين", "النيتروجين", "ثاني أكسيد الكربون", "الأرجون"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد أسنان الإنسان البالغ؟",
                "answer": "32 سناً",
                "options": ["28 سناً", "30 سناً", "32 سناً", "34 سناً"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي السرعة التي ينتقل بها الضوء؟",
                "answer": "300,000 كم/ثانية",
                "options": ["150,000 كم/ثانية", "200,000 كم/ثانية", "300,000 كم/ثانية", "400,000 كم/ثانية"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Sports questions
        sports_questions = [
            {
                "question": "كم عدد اللاعبين في فريق الكرة الطائرة؟",
                "answer": "6 لاعبين",
                "options": ["4 لاعبين", "5 لاعبين", "6 لاعبين", "7 لاعبين"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من فاز بكأس العالم 2018؟",
                "answer": "فرنسا",
                "options": ["البرازيل", "ألمانيا", "فرنسا", "كرواتيا"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم مرة فاز ريال مدريد بدوري أبطال أوروبا؟",
                "answer": "14 مرة",
                "options": ["12 مرة", "13 مرة", "14 مرة", "15 مرة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي رياضة يُستخدم مصطلح 'البيردي'؟",
                "answer": "الجولف",
                "options": ["التنس", "الجولف", "البيسبول", "الكريكيت"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم دقيقة في مباراة كرة السلة؟",
                "answer": "48 دقيقة",
                "options": ["40 دقيقة", "45 دقيقة", "48 دقيقة", "60 دقيقة"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Literature questions
        literature_questions = [
            {
                "question": "من كتب 'كليلة ودمنة'؟",
                "answer": "ابن المقفع",
                "options": ["ابن المقفع", "الجاحظ", "ابن قتيبة", "ابن خلدون"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي جائزة نوبل التي فاز بها نجيب محفوظ؟",
                "answer": "الأدب",
                "options": ["السلام", "الأدب", "الطب", "الاقتصاد"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من هو صاحب معلقة 'قفا نبك'؟",
                "answer": "امرؤ القيس",
                "options": ["امرؤ القيس", "عنترة بن شداد", "زهير بن أبي سلمى", "طرفة بن العبد"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد المعلقات السبع؟",
                "answer": "7 معلقات",
                "options": ["5 معلقات", "6 معلقات", "7 معلقات", "10 معلقات"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من كتب رواية 'الأيام'؟",
                "answer": "طه حسين",
                "options": ["طه حسين", "عباس محمود العقاد", "توفيق الحكيم", "يوسف إدريس"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Religion questions  
        religion_questions = [
            {
                "question": "كم عدد أجزاء القرآن الكريم؟",
                "answer": "30 جزءاً",
                "options": ["28 جزءاً", "29 جزءاً", "30 جزءاً", "32 جزءاً"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي أول آية نزلت من القرآن؟",
                "answer": "اقرأ باسم ربك الذي خلق",
                "options": ["الحمد لله رب العالمين", "اقرأ باسم ربك الذي خلق", "قل هو الله أحد", "بسم الله الرحمن الرحيم"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد الأنبياء المذكورين في القرآن؟",
                "answer": "25 نبياً",
                "options": ["20 نبياً", "22 نبياً", "25 نبياً", "30 نبياً"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي السورة الملقبة بقلب القرآن؟",
                "answer": "سورة يس",
                "options": ["سورة الفاتحة", "سورة البقرة", "سورة يس", "سورة الرحمن"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي غار نزل الوحي على النبي محمد؟",
                "answer": "غار حراء",
                "options": ["غار ثور", "غار حراء", "غار المرسلات", "غار الأراك"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Additional General Knowledge questions
        general_questions = [
            {
                "question": "كم قارة في العالم؟",
                "answer": "7 قارات",
                "options": ["5 قارات", "6 قارات", "7 قارات", "8 قارات"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو أكبر محيط في العالم؟",
                "answer": "المحيط الهادئ",
                "options": ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد الشمالي"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم دولة في الاتحاد الأوروبي؟",
                "answer": "27 دولة",
                "options": ["25 دولة", "26 دولة", "27 دولة", "28 دولة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي عاصمة أستراليا؟",
                "answer": "كانبرا",
                "options": ["سيدني", "ملبورن", "كانبرا", "بيرث"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم ساعة في الأسبوع؟",
                "answer": "168 ساعة",
                "options": ["144 ساعة", "156 ساعة", "168 ساعة", "172 ساعة"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Entertainment questions
        entertainment_questions = [
            {
                "question": "من هو مخرج فيلم 'المومياء' المصري؟",
                "answer": "شادي عبد السلام",
                "options": ["يوسف شاهين", "شادي عبد السلام", "صلاح أبو سيف", "هنري بركات"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم جائزة أوسكار فاز بها فيلم تايتانيك؟",
                "answer": "11 جائزة",
                "options": ["9 جوائز", "10 جوائز", "11 جائزة", "12 جائزة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من غنى 'ثورة الشك'؟",
                "answer": "عبد الحليم حافظ",
                "options": ["محمد عبد الوهاب", "عبد الحليم حافظ", "فريد الأطرش", "محمد فوزي"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي عام توفيت أم كلثوم؟",
                "answer": "1975",
                "options": ["1973", "1974", "1975", "1976"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو بطل فيلم 'الكيت كات'؟",
                "answer": "محمود عبد العزيز",
                "options": ["أحمد زكي", "محمود عبد العزيز", "نور الشريف", "عادل إمام"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Technology questions
        technology_questions = [
            {
                "question": "في أي عام أُطلق أول آيفون؟",
                "answer": "2007",
                "options": ["2005", "2006", "2007", "2008"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أول محرك بحث على الإنترنت؟",
                "answer": "Archie",
                "options": ["Google", "Yahoo", "Archie", "AltaVista"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من مؤسس شركة أمازون؟",
                "answer": "جيف بيزوس",
                "options": ["إيلون ماسك", "جيف بيزوس", "وارن بافيت", "لاري إليسون"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما معنى WiFi؟",
                "answer": "Wireless Fidelity",
                "options": ["Wireless Fidelity", "Wide Fidelity", "Wireless Internet", "Wide Internet"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم بت في البايت الواحد؟",
                "answer": "8 بت",
                "options": ["4 بت", "6 بت", "8 بت", "16 بت"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Additional Arabic Culture questions
        arabic_culture_questions = [
            {
                "question": "ما هو أشهر سوق تراثي في السعودية؟",
                "answer": "سوق عكاظ",
                "options": ["سوق واقف", "سوق عكاظ", "سوق الحميدية", "خان الخليلي"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي عاصمة الثقافة العربية لعام 2022؟",
                "answer": "الكويت",
                "options": ["الرياض", "القاهرة", "الكويت", "عمّان"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم برجاً في أبراج الكويت؟",
                "answer": "3 أبراج",
                "options": ["2 برج", "3 أبراج", "4 أبراج", "5 أبراج"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو اللباس التقليدي للرجال في الخليج؟",
                "answer": "الثوب والغترة",
                "options": ["الجلابية", "الثوب والغترة", "القفطان", "السروال"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي مدينة يقع المسجد الأقصى؟",
                "answer": "القدس",
                "options": ["مكة", "المدينة", "القدس", "دمشق"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Add all new questions
        all_new_questions = [
            ("history", history_questions),
            ("geography", geography_questions),
            ("science", science_questions),
            ("sports", sports_questions),
            ("literature", literature_questions),
            ("religion", religion_questions),
            ("general", general_questions),
            ("entertainment", entertainment_questions),
            ("technology", technology_questions),
            ("arabic_culture", arabic_culture_questions)
        ]
        
        for category_id, questions in all_new_questions:
            for q in questions:
                self.question_counter += 1
                new_question = {
                    "id": f"q_{category_id}_{self.question_counter}",
                    "category_id": category_id,
                    "question": q["question"],
                    "answer": q["answer"],
                    "options": q["options"],
                    "difficulty": q["difficulty"],
                    "points": q["points"]
                }
                self.data["questions"].append(new_question)
                
    def add_themed_questions(self):
        """Add special themed questions (Kuwait, Saudi Arabia, Islamic)"""
        
        # Kuwait-specific questions
        kuwait_questions = [
            {
                "category_id": "arabic_culture",
                "question": "متى استقلت الكويت؟",
                "answer": "1961",
                "options": ["1959", "1960", "1961", "1962"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "geography",
                "question": "كم جزيرة تتبع دولة الكويت؟",
                "answer": "9 جزر",
                "options": ["7 جزر", "8 جزر", "9 جزر", "10 جزر"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "history",
                "question": "من هو مؤسس دولة الكويت الحديثة؟",
                "answer": "الشيخ صباح الأول",
                "options": ["الشيخ مبارك الصباح", "الشيخ صباح الأول", "الشيخ جابر الأول", "الشيخ أحمد الجابر"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "sports",
                "question": "في أي عام فازت الكويت بكأس الخليج لأول مرة؟",
                "answer": "1970",
                "options": ["1968", "1970", "1972", "1974"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "general",
                "question": "ما هو شعار دولة الكويت؟",
                "answer": "صقر",
                "options": ["نسر", "صقر", "غزال", "حصان"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Saudi Arabia-specific questions
        saudi_questions = [
            {
                "category_id": "history",
                "question": "متى توحدت المملكة العربية السعودية؟",
                "answer": "1932",
                "options": ["1930", "1931", "1932", "1933"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "geography",
                "question": "كم منطقة إدارية في السعودية؟",
                "answer": "13 منطقة",
                "options": ["11 منطقة", "12 منطقة", "13 منطقة", "14 منطقة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "arabic_culture",
                "question": "ما هو الزي الرسمي للنساء في السعودية؟",
                "answer": "العباءة",
                "options": ["الجلابية", "العباءة", "الثوب", "البرقع"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "general",
                "question": "كم نخلة في شعار السعودية؟",
                "answer": "نخلة واحدة",
                "options": ["نخلة واحدة", "نخلتان", "ثلاث نخلات", "لا توجد نخلة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "religion",
                "question": "كم مرة يؤدي المسلمون العمرة في السعودية سنوياً؟",
                "answer": "على مدار السنة",
                "options": ["مرة واحدة", "مرتان", "في رمضان فقط", "على مدار السنة"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Add themed questions
        for q in kuwait_questions + saudi_questions:
            self.question_counter += 1
            new_question = {
                "id": f"q_{q['category_id']}_{self.question_counter}",
                "category_id": q["category_id"],
                "question": q["question"],
                "answer": q["answer"],
                "options": q["options"],
                "difficulty": q["difficulty"],
                "points": q["points"]
            }
            self.data["questions"].append(new_question)
    
    def save_final_database(self):
        """Save the final expanded database"""
        # Update metadata
        self.data["metadata"]["extracted_date"] = datetime.now().isoformat()
        self.data["metadata"]["total_questions"] = len(self.data["questions"])
        self.data["metadata"]["questions_per_category"] = {}
        
        # Count questions per category
        for category in self.data["categories"]:
            count = len([q for q in self.data["questions"] if q["category_id"] == category["id"]])
            self.data["metadata"]["questions_per_category"][category["id"]] = count
        
        # Save main file
        with open('output/sho6sho6_extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Save a complete version
        with open('output/sho6sho6_complete_database.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Update CSV files
        self.update_csv_files()
        
        print(f"\nDatabase expansion complete!")
        print(f"Total questions: {len(self.data['questions'])}")
        print("\nQuestions per category:")
        for cat_id, count in self.data["metadata"]["questions_per_category"].items():
            cat_name = next(c["name"] for c in self.data["categories"] if c["id"] == cat_id)
            print(f"  {cat_name}: {count} questions")
            
    def update_csv_files(self):
        """Update CSV files with all questions"""
        import csv
        
        # Update questions CSV
        with open('output/sho6sho6_questions.csv', 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['id', 'category_id', 'question', 'answer', 'difficulty', 'points', 'options']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for q in self.data["questions"]:
                row = q.copy()
                row['options'] = ' | '.join(row['options'])  # Convert list to string
                writer.writerow(row)
                
        print(f"\nCSV file updated: output/sho6sho6_questions.csv")
        
    def generate_statistics(self):
        """Generate statistics about the database"""
        stats = {
            "total_questions": len(self.data["questions"]),
            "categories": len(self.data["categories"]),
            "difficulty_breakdown": {
                "سهل": 0,
                "متوسط": 0,
                "صعب": 0
            },
            "points_breakdown": {
                5: 0,
                10: 0,
                15: 0
            }
        }
        
        for q in self.data["questions"]:
            stats["difficulty_breakdown"][q["difficulty"]] += 1
            stats["points_breakdown"][q["points"]] += 1
            
        # Save statistics
        with open('output/database_statistics.json', 'w', encoding='utf-8') as f:
            json.dump(stats, f, ensure_ascii=False, indent=2)
            
        print("\nDatabase Statistics:")
        print(f"Total Questions: {stats['total_questions']}")
        print(f"Categories: {stats['categories']}")
        print("\nDifficulty Distribution:")
        for diff, count in stats["difficulty_breakdown"].items():
            percentage = (count / stats["total_questions"]) * 100
            print(f"  {diff}: {count} ({percentage:.1f}%)")
        print("\nPoints Distribution:")
        for points, count in stats["points_breakdown"].items():
            percentage = (count / stats["total_questions"]) * 100
            print(f"  {points} points: {count} ({percentage:.1f}%)")

def main():
    print("Continuing Sho6sho6 Database Expansion")
    print("="*40)
    
    expander = ContinuousExpander()
    print("\nAdding more questions...")
    expander.add_more_questions()
    
    print("\nAdding themed questions (Kuwait, Saudi Arabia)...")
    expander.add_themed_questions()
    
    expander.save_final_database()
    expander.generate_statistics()
    
    print("\n" + "="*40)
    print("Expansion complete!")
    print("\nFiles created/updated:")
    print("- output/sho6sho6_extracted_data.json (main database)")
    print("- output/sho6sho6_complete_database.json (complete version)")
    print("- output/sho6sho6_questions.csv (CSV format)")
    print("- output/database_statistics.json (statistics)")

if __name__ == "__main__":
    main()