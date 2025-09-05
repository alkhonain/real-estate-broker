import json
import os
from datetime import datetime

class UltimateExpander:
    def __init__(self):
        # Load existing data
        with open('output/sho6sho6_extracted_data.json', 'r', encoding='utf-8') as f:
            self.data = json.load(f)
            
        self.question_counter = len(self.data['questions'])
        print(f"Starting with {self.question_counter} questions")
    
    def add_ultimate_batch(self):
        """Add an ultimate batch of questions covering all topics extensively"""
        
        # Advanced History questions
        advanced_history = [
            {
                "question": "من هو مؤسس الدولة السعودية الأولى؟",
                "answer": "محمد بن سعود",
                "options": ["عبد العزيز بن سعود", "محمد بن سعود", "سعود بن عبد العزيز", "تركي بن عبد الله"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "متى سقطت غرناطة آخر معاقل المسلمين في الأندلس؟",
                "answer": "1492",
                "options": ["1490", "1491", "1492", "1493"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو الخليفة العباسي في عصر ألف ليلة وليلة؟",
                "answer": "هارون الرشيد",
                "options": ["المأمون", "هارون الرشيد", "المعتصم", "الأمين"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي معركة انتصر المسلمون على المغول؟",
                "answer": "عين جالوت",
                "options": ["حطين", "القادسية", "عين جالوت", "اليرموك"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو آخر سلاطين المماليك في مصر؟",
                "answer": "طومان باي",
                "options": ["قانصوه الغوري", "طومان باي", "الأشرف قايتباي", "برسباي"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "متى تم اكتشاف النفط في السعودية؟",
                "answer": "1938",
                "options": ["1936", "1937", "1938", "1939"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو مؤسس الدولة الطولونية في مصر؟",
                "answer": "أحمد بن طولون",
                "options": ["عمرو بن العاص", "أحمد بن طولون", "محمد بن طغج", "كافور الإخشيدي"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "متى تم افتتاح قناة السويس؟",
                "answer": "1869",
                "options": ["1867", "1868", "1869", "1870"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من قاد الثورة العربية الكبرى؟",
                "answer": "الشريف حسين بن علي",
                "options": ["فيصل بن الحسين", "الشريف حسين بن علي", "عبد الله بن الحسين", "لورنس العرب"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي عام احتل العثمانيون مصر؟",
                "answer": "1517",
                "options": ["1515", "1516", "1517", "1518"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Advanced Geography questions
        advanced_geography = [
            {
                "question": "ما هي أصغر دولة عربية مساحة؟",
                "answer": "البحرين",
                "options": ["الكويت", "البحرين", "قطر", "لبنان"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم دولة عربية في قارة أفريقيا؟",
                "answer": "10 دول",
                "options": ["8 دول", "9 دول", "10 دول", "11 دولة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو أطول وادي في السعودية؟",
                "answer": "وادي الرمة",
                "options": ["وادي حنيفة", "وادي الرمة", "وادي الدواسر", "وادي بيشة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "أين تقع جزر القمر؟",
                "answer": "المحيط الهندي",
                "options": ["البحر الأحمر", "المحيط الأطلسي", "المحيط الهندي", "البحر المتوسط"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي العاصمة الإدارية الجديدة لمصر؟",
                "answer": "العاصمة الإدارية الجديدة",
                "options": ["القاهرة الجديدة", "العاصمة الإدارية الجديدة", "6 أكتوبر", "العلمين الجديدة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم جزيرة في البحرين؟",
                "answer": "33 جزيرة",
                "options": ["20 جزيرة", "25 جزيرة", "33 جزيرة", "40 جزيرة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي أكبر واحة في العالم؟",
                "answer": "واحة الأحساء",
                "options": ["واحة سيوة", "واحة الأحساء", "واحة الفيوم", "واحة الداخلة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "أين يصب نهر الأردن؟",
                "answer": "البحر الميت",
                "options": ["البحر الأحمر", "البحر المتوسط", "البحر الميت", "بحيرة طبريا"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي أعلى قمة في الجزائر؟",
                "answer": "قمة تاهات",
                "options": ["جبل شيليا", "قمة تاهات", "جبل الأوراس", "جبل جرجرة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم محافظة في العراق؟",
                "answer": "18 محافظة",
                "options": ["15 محافظة", "16 محافظة", "18 محافظة", "20 محافظة"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Advanced Science questions
        advanced_science = [
            {
                "question": "ما هو العنصر الكيميائي لملح الطعام؟",
                "answer": "كلوريد الصوديوم",
                "options": ["كربونات الصوديوم", "كلوريد الصوديوم", "كبريتات الصوديوم", "نترات الصوديوم"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد الكروموسومات في الإنسان؟",
                "answer": "46 كروموسوم",
                "options": ["44 كروموسوم", "46 كروموسوم", "48 كروموسوم", "50 كروموسوم"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أقوى حمض في العالم؟",
                "answer": "الحمض الفلوروأنتيمونيك",
                "options": ["حمض الكبريتيك", "حمض النيتريك", "الحمض الفلوروأنتيمونيك", "حمض الهيدروكلوريك"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من اكتشف فصائل الدم؟",
                "answer": "كارل لاندشتاينر",
                "options": ["لويس باستور", "كارل لاندشتاينر", "روبرت كوخ", "ألكسندر فلمنغ"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم يبلغ عدد عضلات جسم الإنسان؟",
                "answer": "أكثر من 600 عضلة",
                "options": ["400 عضلة", "500 عضلة", "أكثر من 600 عضلة", "700 عضلة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أصغر جزء في الذرة؟",
                "answer": "الكوارك",
                "options": ["الإلكترون", "البروتون", "النيوترون", "الكوارك"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم تبلغ درجة الحرارة في مركز الشمس؟",
                "answer": "15 مليون درجة مئوية",
                "options": ["1 مليون درجة", "5 مليون درجة", "10 مليون درجة", "15 مليون درجة مئوية"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو أسرع حيوان بحري؟",
                "answer": "سمكة الزعنفة الشراعية",
                "options": ["القرش", "الدولفين", "سمكة الزعنفة الشراعية", "الحوت"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم عدد حجرات قلب التمساح؟",
                "answer": "4 حجرات",
                "options": ["2 حجرة", "3 حجرات", "4 حجرات", "5 حجرات"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو أكبر كوكب في المجموعة الشمسية؟",
                "answer": "المشتري",
                "options": ["زحل", "المشتري", "أورانوس", "نبتون"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Gulf-specific questions
        gulf_questions = [
            {
                "category_id": "history",
                "question": "متى تأسس مجلس التعاون الخليجي؟",
                "answer": "1981",
                "options": ["1979", "1980", "1981", "1982"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "geography",
                "question": "ما هي أكبر جزيرة كويتية؟",
                "answer": "بوبيان",
                "options": ["فيلكا", "وربة", "بوبيان", "كبر"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "sports",
                "question": "كم مرة فازت السعودية بكأس آسيا؟",
                "answer": "3 مرات",
                "options": ["مرتان", "3 مرات", "4 مرات", "5 مرات"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "arabic_culture",
                "question": "ما هو الزي التقليدي للمرأة الكويتية؟",
                "answer": "الدراعة",
                "options": ["العباءة", "الدراعة", "الثوب", "البشت"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "general",
                "question": "ما هي عملة البحرين؟",
                "answer": "الدينار البحريني",
                "options": ["الريال", "الدرهم", "الدينار البحريني", "الريال البحريني"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "history",
                "question": "من هو مؤسس دولة قطر الحديثة؟",
                "answer": "الشيخ جاسم بن محمد",
                "options": ["الشيخ حمد بن خليفة", "الشيخ جاسم بن محمد", "الشيخ خليفة بن حمد", "الشيخ تميم"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "geography",
                "question": "كم تبلغ مساحة دولة الإمارات تقريباً؟",
                "answer": "83,600 كم²",
                "options": ["71,000 كم²", "83,600 كم²", "95,000 كم²", "105,000 كم²"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "arabic_culture",
                "question": "ما هو الطبق الشعبي في الكويت؟",
                "answer": "المجبوس",
                "options": ["الكبسة", "المجبوس", "المندي", "البرياني"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "general",
                "question": "في أي عام استضافت قطر كأس العالم؟",
                "answer": "2022",
                "options": ["2020", "2021", "2022", "2023"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "history",
                "question": "متى انضمت الكويت للأمم المتحدة؟",
                "answer": "1963",
                "options": ["1961", "1962", "1963", "1964"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Islamic questions
        islamic_questions = [
            {
                "category_id": "religion",
                "question": "كم عدد الأحزاب في القرآن؟",
                "answer": "60 حزباً",
                "options": ["30 حزباً", "40 حزباً", "60 حزباً", "80 حزباً"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "religion",
                "question": "من هو أول من أذن في الإسلام؟",
                "answer": "بلال بن رباح",
                "options": ["عمر بن الخطاب", "بلال بن رباح", "أبو بكر الصديق", "علي بن أبي طالب"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "religion",
                "question": "كم مرة ذُكرت كلمة 'الصلاة' في القرآن؟",
                "answer": "67 مرة",
                "options": ["50 مرة", "60 مرة", "67 مرة", "75 مرة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "religion",
                "question": "ما هي السورة التي تُسمى عروس القرآن؟",
                "answer": "سورة الرحمن",
                "options": ["سورة مريم", "سورة الرحمن", "سورة الواقعة", "سورة الملك"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "religion",
                "question": "كم عدد آيات سورة الفاتحة؟",
                "answer": "7 آيات",
                "options": ["5 آيات", "6 آيات", "7 آيات", "8 آيات"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "history",
                "question": "في أي عام وقعت غزوة أحد؟",
                "answer": "3 هجري",
                "options": ["2 هجري", "3 هجري", "4 هجري", "5 هجري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "religion",
                "question": "من هو النبي الذي لُقب بخليل الله؟",
                "answer": "إبراهيم عليه السلام",
                "options": ["موسى", "إبراهيم عليه السلام", "عيسى", "محمد"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "religion",
                "question": "كم مرة حج النبي محمد؟",
                "answer": "مرة واحدة",
                "options": ["مرة واحدة", "مرتان", "ثلاث مرات", "أربع مرات"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "religion",
                "question": "ما هي أقصر سورة في القرآن؟",
                "answer": "سورة الكوثر",
                "options": ["سورة الإخلاص", "سورة الكوثر", "سورة العصر", "سورة الناس"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "history",
                "question": "من هو أول شهيد في الإسلام؟",
                "answer": "سمية بنت خياط",
                "options": ["حمزة بن عبد المطلب", "سمية بنت خياط", "ياسر بن عامر", "عمار بن ياسر"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Modern questions (2020s)
        modern_questions = [
            {
                "category_id": "technology",
                "question": "متى أُطلق ChatGPT؟",
                "answer": "2022",
                "options": ["2020", "2021", "2022", "2023"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "sports",
                "question": "من فاز بكأس العالم 2022؟",
                "answer": "الأرجنتين",
                "options": ["فرنسا", "الأرجنتين", "البرازيل", "كرواتيا"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "general",
                "question": "ما هو مشروع نيوم؟",
                "answer": "مدينة ذكية في السعودية",
                "options": ["مشروع سياحي", "مدينة ذكية في السعودية", "شركة تقنية", "مشروع طاقة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "technology",
                "question": "من اشترى تويتر في 2022؟",
                "answer": "إيلون ماسك",
                "options": ["جيف بيزوس", "إيلون ماسك", "بيل غيتس", "مارك زوكربيرغ"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "arabic_culture",
                "question": "أين أقيمت إكسبو 2020؟",
                "answer": "دبي",
                "options": ["الرياض", "دبي", "الدوحة", "القاهرة"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Add all questions
        all_new_batches = [
            ("history", advanced_history),
            ("geography", advanced_geography),
            ("science", advanced_science)
        ]
        
        # Add regular questions
        for category_id, questions in all_new_batches:
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
        
        # Add special category questions
        for q in gulf_questions + islamic_questions + modern_questions:
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
    
    def add_bonus_questions(self):
        """Add bonus educational questions"""
        
        bonus_questions = [
            # Math questions
            {
                "category_id": "science",
                "question": "كم يساوي 15% من 200؟",
                "answer": "30",
                "options": ["20", "25", "30", "35"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "science",
                "question": "ما هو ناتج 7 × 8؟",
                "answer": "56",
                "options": ["54", "56", "58", "60"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "science",
                "question": "كم ضلعاً في الشكل السداسي؟",
                "answer": "6 أضلاع",
                "options": ["5 أضلاع", "6 أضلاع", "7 أضلاع", "8 أضلاع"],
                "difficulty": "سهل",
                "points": 5
            },
            # Language questions
            {
                "category_id": "literature",
                "question": "ما هو جمع كلمة 'مفتاح'؟",
                "answer": "مفاتيح",
                "options": ["مفاتح", "مفاتيح", "أمفتاح", "مفتوحات"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "literature",
                "question": "ما هو مضاد كلمة 'نهار'؟",
                "answer": "ليل",
                "options": ["صباح", "مساء", "ليل", "فجر"],
                "difficulty": "سهل",
                "points": 5
            },
            # Fun facts
            {
                "category_id": "general",
                "question": "كم عدد النقاط على النرد؟",
                "answer": "21 نقطة",
                "options": ["18 نقطة", "20 نقطة", "21 نقطة", "24 نقطة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "general",
                "question": "ما هو لون الصندوق الأسود في الطائرة؟",
                "answer": "برتقالي",
                "options": ["أسود", "أحمر", "برتقالي", "أصفر"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "entertainment",
                "question": "كم عدد المربعات في رقعة الشطرنج؟",
                "answer": "64 مربعاً",
                "options": ["48 مربعاً", "56 مربعاً", "64 مربعاً", "72 مربعاً"],
                "difficulty": "متوسط",
                "points": 10
            },
            # Health & Medicine
            {
                "category_id": "science",
                "question": "كم عدد الأسنان اللبنية عند الأطفال؟",
                "answer": "20 سناً",
                "options": ["16 سناً", "18 سناً", "20 سناً", "24 سناً"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "science",
                "question": "ما هي فصيلة الدم الأكثر ندرة؟",
                "answer": "AB سالب",
                "options": ["O سالب", "AB سالب", "B سالب", "A سالب"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Add all bonus questions
        for q in bonus_questions:
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
    
    def save_ultimate_database(self):
        """Save the ultimate database"""
        # Update metadata
        self.data["metadata"]["extracted_date"] = datetime.now().isoformat()
        self.data["metadata"]["total_questions"] = len(self.data["questions"])
        self.data["metadata"]["questions_per_category"] = {}
        self.data["metadata"]["database_version"] = "2.0 Ultimate"
        
        # Count questions per category
        for category in self.data["categories"]:
            count = len([q for q in self.data["questions"] if q["category_id"] == category["id"]])
            self.data["metadata"]["questions_per_category"][category["id"]] = count
        
        # Save files
        with open('output/sho6sho6_extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        with open('output/sho6sho6_ultimate_database.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Update CSV with all questions
        import csv
        with open('output/sho6sho6_questions.csv', 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['id', 'category_id', 'question', 'answer', 'difficulty', 'points', 'options']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for q in self.data["questions"]:
                row = q.copy()
                row['options'] = ' | '.join(row['options'])
                writer.writerow(row)
        
        # Create a summary file
        summary = {
            "database_name": "Sho6sho6 Ultimate Question Database",
            "version": "2.0",
            "total_questions": len(self.data["questions"]),
            "total_categories": len(self.data["categories"]),
            "extraction_date": datetime.now().isoformat(),
            "categories_summary": self.data["metadata"]["questions_per_category"],
            "difficulty_breakdown": {},
            "features": [
                "Arabic quiz questions",
                "Multiple choice format",
                "3 difficulty levels",
                "Point-based scoring",
                "10 main categories",
                "Gulf-specific content",
                "Islamic content",
                "Modern topics (2020s)",
                "Educational content"
            ]
        }
        
        # Calculate difficulty breakdown
        for difficulty in ["سهل", "متوسط", "صعب"]:
            count = len([q for q in self.data["questions"] if q["difficulty"] == difficulty])
            summary["difficulty_breakdown"][difficulty] = {
                "count": count,
                "percentage": f"{(count/len(self.data['questions'])*100):.1f}%"
            }
        
        with open('output/database_summary.json', 'w', encoding='utf-8') as f:
            json.dump(summary, f, ensure_ascii=False, indent=2)
        
        print(f"\n🎉 Ultimate Database Created! 🎉")
        print(f"Total Questions: {len(self.data['questions'])}")
        print("\nQuestions per category:")
        for cat_id, count in self.data["metadata"]["questions_per_category"].items():
            cat_name = next(c["name"] for c in self.data["categories"] if c["id"] == cat_id)
            print(f"  {cat_name}: {count} questions")

def main():
    print("Ultimate Sho6sho6 Database Expansion")
    print("="*50)
    
    expander = UltimateExpander()
    
    print("\nAdding ultimate question batch...")
    expander.add_ultimate_batch()
    
    print("\nAdding bonus educational questions...")
    expander.add_bonus_questions()
    
    expander.save_ultimate_database()
    
    print("\n" + "="*50)
    print("✅ Database expansion complete!")
    print("\nFiles created/updated:")
    print("- output/sho6sho6_extracted_data.json (main database)")
    print("- output/sho6sho6_ultimate_database.json (backup)")
    print("- output/sho6sho6_questions.csv (CSV format)")
    print("- output/database_summary.json (summary report)")

if __name__ == "__main__":
    main()