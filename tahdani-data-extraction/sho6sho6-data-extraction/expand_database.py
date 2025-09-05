import json
import os
from datetime import datetime

class DatabaseExpander:
    def __init__(self):
        # Load existing data
        with open('output/sho6sho6_extracted_data.json', 'r', encoding='utf-8') as f:
            self.data = json.load(f)
            
        self.question_counter = len(self.data['questions'])
        
    def add_questions(self):
        """Add more questions to each category"""
        
        # History questions
        history_questions = [
            {
                "question": "متى فُتحت مكة المكرمة؟",
                "answer": "8 هجري",
                "options": ["6 هجري", "7 هجري", "8 هجري", "9 هجري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو القائد المسلم الذي فتح الأندلس؟",
                "answer": "طارق بن زياد",
                "options": ["خالد بن الوليد", "طارق بن زياد", "عمرو بن العاص", "سعد بن أبي وقاص"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي عام سقطت الدولة العباسية؟",
                "answer": "656 هجري",
                "options": ["656 هجري", "750 هجري", "492 هجري", "923 هجري"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو اسم أول دولة إسلامية في التاريخ؟",
                "answer": "دولة المدينة المنورة",
                "options": ["الدولة الأموية", "دولة المدينة المنورة", "الدولة العباسية", "دولة الخلفاء الراشدين"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم استمرت الحرب العالمية الأولى؟",
                "answer": "4 سنوات",
                "options": ["3 سنوات", "4 سنوات", "5 سنوات", "6 سنوات"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Geography questions
        geography_questions = [
            {
                "question": "ما هي عاصمة الأردن؟",
                "answer": "عمّان",
                "options": ["عمّان", "إربد", "العقبة", "الزرقاء"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "أين يقع أطول نهر في العالم؟",
                "answer": "أفريقيا",
                "options": ["آسيا", "أفريقيا", "أمريكا الجنوبية", "أوروبا"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد الدول العربية؟",
                "answer": "22 دولة",
                "options": ["20 دولة", "21 دولة", "22 دولة", "23 دولة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي أعمق نقطة في المحيطات؟",
                "answer": "خندق ماريانا",
                "options": ["خندق ماريانا", "خندق بورتوريكو", "خندق جاوة", "خندق اليابان"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "أين تقع صحراء الربع الخالي؟",
                "answer": "السعودية",
                "options": ["مصر", "السعودية", "ليبيا", "الجزائر"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Science questions
        science_questions = [
            {
                "question": "كم عدد الكواكب في المجموعة الشمسية؟",
                "answer": "8 كواكب",
                "options": ["7 كواكب", "8 كواكب", "9 كواكب", "10 كواكب"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي وحدة قياس التيار الكهربائي؟",
                "answer": "الأمبير",
                "options": ["الفولت", "الأمبير", "الأوم", "الواط"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من اكتشف البنسلين؟",
                "answer": "ألكسندر فلمنغ",
                "options": ["لويس باستور", "ألكسندر فلمنغ", "روبرت كوخ", "جوزيف ليستر"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أسرع كائن حي على الأرض؟",
                "answer": "الفهد",
                "options": ["النمر", "الأسد", "الفهد", "الغزال"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم عدد العظام في جسم الإنسان البالغ؟",
                "answer": "206 عظمة",
                "options": ["186 عظمة", "196 عظمة", "206 عظمة", "216 عظمة"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Sports questions
        sports_questions = [
            {
                "question": "في أي عام أقيمت أول بطولة لكأس العالم؟",
                "answer": "1930",
                "options": ["1928", "1930", "1932", "1934"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد اللاعبين في فريق كرة السلة؟",
                "answer": "5 لاعبين",
                "options": ["4 لاعبين", "5 لاعبين", "6 لاعبين", "7 لاعبين"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من هو اللاعب الملقب بـ 'الظاهرة'؟",
                "answer": "رونالدو البرازيلي",
                "options": ["بيليه", "مارادونا", "رونالدو البرازيلي", "زيدان"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم مدة الشوط الواحد في كرة القدم؟",
                "answer": "45 دقيقة",
                "options": ["40 دقيقة", "45 دقيقة", "50 دقيقة", "60 دقيقة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "أين أقيمت دورة الألعاب الأولمبية عام 2016؟",
                "answer": "ريو دي جانيرو",
                "options": ["لندن", "بكين", "ريو دي جانيرو", "طوكيو"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Literature questions
        literature_questions = [
            {
                "question": "من كتب رواية 'ألف ليلة وليلة'؟",
                "answer": "مؤلف مجهول",
                "options": ["الجاحظ", "المتنبي", "مؤلف مجهول", "ابن المقفع"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو أمير الشعراء؟",
                "answer": "أحمد شوقي",
                "options": ["أحمد شوقي", "حافظ إبراهيم", "بدر شاكر السياب", "نزار قباني"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من مؤلف كتاب 'البخلاء'؟",
                "answer": "الجاحظ",
                "options": ["الجاحظ", "ابن خلدون", "المعري", "ابن رشد"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي أشهر قصيدة للمتنبي؟",
                "answer": "واحر قلباه",
                "options": ["واحر قلباه", "أراك عصي الدمع", "قفا نبك", "لامية العرب"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من كتب رواية 'موسم الهجرة إلى الشمال'؟",
                "answer": "الطيب صالح",
                "options": ["نجيب محفوظ", "الطيب صالح", "غسان كنفاني", "حنا مينه"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Religion questions
        religion_questions = [
            {
                "question": "كم عدد أركان الإسلام؟",
                "answer": "5 أركان",
                "options": ["3 أركان", "4 أركان", "5 أركان", "6 أركان"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي شهر نزل القرآن الكريم؟",
                "answer": "رمضان",
                "options": ["رجب", "شعبان", "رمضان", "شوال"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم عدد السور المكية في القرآن؟",
                "answer": "86 سورة",
                "options": ["82 سورة", "84 سورة", "86 سورة", "88 سورة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو خاتم الأنبياء؟",
                "answer": "محمد صلى الله عليه وسلم",
                "options": ["عيسى عليه السلام", "موسى عليه السلام", "إبراهيم عليه السلام", "محمد صلى الله عليه وسلم"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم مرة ورد اسم محمد في القرآن؟",
                "answer": "4 مرات",
                "options": ["3 مرات", "4 مرات", "5 مرات", "6 مرات"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # General knowledge questions
        general_questions = [
            {
                "question": "ما هي عملة اليابان؟",
                "answer": "الين",
                "options": ["اليوان", "الين", "الوون", "الروبية"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم لوناً في قوس قزح؟",
                "answer": "7 ألوان",
                "options": ["5 ألوان", "6 ألوان", "7 ألوان", "8 ألوان"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي أصغر دولة في العالم؟",
                "answer": "الفاتيكان",
                "options": ["موناكو", "الفاتيكان", "سان مارينو", "ليختنشتاين"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من اخترع المصباح الكهربائي؟",
                "answer": "توماس إديسون",
                "options": ["ألكسندر بيل", "توماس إديسون", "نيكولا تسلا", "بنجامين فرانكلين"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم يوماً في السنة الكبيسة؟",
                "answer": "366 يوماً",
                "options": ["364 يوماً", "365 يوماً", "366 يوماً", "367 يوماً"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Entertainment questions
        entertainment_questions = [
            {
                "question": "من أخرج فيلم 'الرسالة'؟",
                "answer": "مصطفى العقاد",
                "options": ["يوسف شاهين", "مصطفى العقاد", "هنري بركات", "صلاح أبو سيف"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أول فيلم كرتوني طويل من إنتاج ديزني؟",
                "answer": "سنو وايت والأقزام السبعة",
                "options": ["سندريلا", "سنو وايت والأقزام السبعة", "بينوكيو", "بامبي"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من غنى أغنية 'أم كلثوم' الشهيرة 'ألف ليلة وليلة'؟",
                "answer": "أم كلثوم",
                "options": ["فيروز", "أم كلثوم", "وردة", "أسمهان"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي عام صدر فيلم تايتانيك؟",
                "answer": "1997",
                "options": ["1995", "1996", "1997", "1998"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو الملقب بـ 'موسيقار الأجيال'؟",
                "answer": "محمد عبد الوهاب",
                "options": ["محمد عبد الوهاب", "بليغ حمدي", "سيد درويش", "رياض السنباطي"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Technology questions
        technology_questions = [
            {
                "question": "من أسس شركة مايكروسوفت؟",
                "answer": "بيل غيتس",
                "options": ["ستيف جوبز", "بيل غيتس", "مارك زوكربيرغ", "لاري بيج"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو نظام التشغيل الأكثر استخداماً في الهواتف الذكية؟",
                "answer": "أندرويد",
                "options": ["iOS", "أندرويد", "ويندوز", "بلاك بيري"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي عام أُطلق موقع فيسبوك؟",
                "answer": "2004",
                "options": ["2002", "2003", "2004", "2005"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما معنى HTML؟",
                "answer": "لغة توصيف النص الفائق",
                "options": ["لغة برمجة عالية", "لغة توصيف النص الفائق", "بروتوكول نقل النص", "لغة الآلة المترجمة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من اخترع الهاتف؟",
                "answer": "ألكسندر غراهام بيل",
                "options": ["توماس إديسون", "ألكسندر غراهام بيل", "نيكولا تسلا", "غوليلمو ماركوني"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Arabic culture questions
        arabic_culture_questions = [
            {
                "question": "ما هي أقدم جامعة في العالم العربي؟",
                "answer": "جامعة القرويين",
                "options": ["الأزهر", "القرويين", "الزيتونة", "المستنصرية"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم عدد الحروف في اللغة العربية؟",
                "answer": "28 حرفاً",
                "options": ["26 حرفاً", "27 حرفاً", "28 حرفاً", "29 حرفاً"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو الطبق الشعبي الأشهر في السعودية؟",
                "answer": "الكبسة",
                "options": ["المنسف", "الكبسة", "المجبوس", "البرياني"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من صمم العلم السعودي الحالي؟",
                "answer": "حافظ وهبة",
                "options": ["حافظ وهبة", "أحمد إبراهيم", "محمد المانع", "عبد العزيز التويجري"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي أشهر رقصة شعبية في الخليج؟",
                "answer": "العرضة",
                "options": ["الدبكة", "العرضة", "التنورة", "الخطوة"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Add all questions to the database
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
        
    def save_expanded_database(self):
        """Save the expanded database"""
        # Update metadata
        self.data["metadata"]["extracted_date"] = datetime.now().isoformat()
        self.data["metadata"]["total_questions"] = len(self.data["questions"])
        self.data["metadata"]["questions_per_category"] = {}
        
        # Count questions per category
        for category in self.data["categories"]:
            count = len([q for q in self.data["questions"] if q["category_id"] == category["id"]])
            self.data["metadata"]["questions_per_category"][category["id"]] = count
        
        # Save to file
        with open('output/sho6sho6_expanded_database.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Also update the original file
        with open('output/sho6sho6_extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        print(f"Database expanded successfully!")
        print(f"Total questions: {len(self.data['questions'])}")
        print("\nQuestions per category:")
        for cat_id, count in self.data["metadata"]["questions_per_category"].items():
            cat_name = next(c["name"] for c in self.data["categories"] if c["id"] == cat_id)
            print(f"  {cat_name}: {count} questions")
            
    def create_category_files(self):
        """Create separate files for each category"""
        os.makedirs('output/categories', exist_ok=True)
        
        for category in self.data["categories"]:
            category_data = {
                "category": category,
                "questions": [q for q in self.data["questions"] if q["category_id"] == category["id"]]
            }
            
            filename = f"output/categories/{category['id']}_questions.json"
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(category_data, f, ensure_ascii=False, indent=2)
                
        print(f"\nCreated individual category files in output/categories/")

def main():
    print("Expanding Sho6sho6 Database")
    print("="*40)
    
    expander = DatabaseExpander()
    expander.add_questions()
    expander.save_expanded_database()
    expander.create_category_files()
    
    print("\nExpansion complete!")
    print("Files created:")
    print("- output/sho6sho6_expanded_database.json (main database)")
    print("- output/sho6sho6_extracted_data.json (updated)")
    print("- output/categories/*.json (individual category files)")

if __name__ == "__main__":
    main()