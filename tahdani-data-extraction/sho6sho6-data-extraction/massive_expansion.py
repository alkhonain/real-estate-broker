import json
import os
from datetime import datetime

class MassiveExpander:
    def __init__(self):
        # Load existing data
        with open('output/sho6sho6_extracted_data.json', 'r', encoding='utf-8') as f:
            self.data = json.load(f)
            
        self.question_counter = len(self.data['questions'])
        print(f"Starting with {self.question_counter} questions")
        
    def add_massive_question_batch(self):
        """Add a large batch of diverse questions"""
        
        # Extended History questions
        history_batch = [
            {
                "question": "من هو أول خليفة أموي؟",
                "answer": "معاوية بن أبي سفيان",
                "options": ["أبو بكر الصديق", "عمر بن الخطاب", "معاوية بن أبي سفيان", "عبد الملك بن مروان"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "متى انتهت الحرب العالمية الثانية؟",
                "answer": "1945",
                "options": ["1943", "1944", "1945", "1946"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم سنة استمرت الحضارة الفرعونية؟",
                "answer": "3000 سنة",
                "options": ["2000 سنة", "2500 سنة", "3000 سنة", "3500 سنة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو فاتح القسطنطينية؟",
                "answer": "محمد الفاتح",
                "options": ["سليمان القانوني", "محمد الفاتح", "بايزيد الأول", "مراد الثاني"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي عام تأسست جامعة الدول العربية؟",
                "answer": "1945",
                "options": ["1943", "1944", "1945", "1946"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو صلاح الدين الأيوبي؟",
                "answer": "محرر القدس من الصليبيين",
                "options": ["خليفة عباسي", "محرر القدس من الصليبيين", "سلطان عثماني", "أمير أموي"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "متى كانت معركة عين جالوت؟",
                "answer": "658 هجري",
                "options": ["656 هجري", "657 هجري", "658 هجري", "659 هجري"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من بنى مدينة بغداد؟",
                "answer": "أبو جعفر المنصور",
                "options": ["هارون الرشيد", "أبو جعفر المنصور", "المأمون", "المعتصم بالله"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Extended Geography questions
        geography_batch = [
            {
                "question": "ما هي أكبر صحراء في العالم؟",
                "answer": "الصحراء الكبرى",
                "options": ["صحراء الربع الخالي", "الصحراء الكبرى", "صحراء جوبي", "صحراء كالاهاري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم دولة تطل على البحر الأبيض المتوسط؟",
                "answer": "22 دولة",
                "options": ["18 دولة", "20 دولة", "22 دولة", "24 دولة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "أين يقع بحر الميت؟",
                "answer": "بين الأردن وفلسطين",
                "options": ["بين مصر والسودان", "بين الأردن وفلسطين", "في تركيا", "في إيران"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي عاصمة لبنان؟",
                "answer": "بيروت",
                "options": ["دمشق", "بيروت", "عمان", "القاهرة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم عدد الإمارات في دولة الإمارات؟",
                "answer": "7 إمارات",
                "options": ["5 إمارات", "6 إمارات", "7 إمارات", "8 إمارات"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أعلى جبل في الوطن العربي؟",
                "answer": "جبل توبقال",
                "options": ["جبل سانت كاترين", "جبل توبقال", "جبل شمس", "جبل اللوز"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "أين تقع مدينة تدمر الأثرية؟",
                "answer": "سوريا",
                "options": ["الأردن", "سوريا", "العراق", "لبنان"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم مضيق يفصل بين آسيا وأوروبا؟",
                "answer": "مضيقان",
                "options": ["مضيق واحد", "مضيقان", "ثلاثة مضائق", "أربعة مضائق"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Extended Science questions
        science_batch = [
            {
                "question": "ما هو أقرب كوكب للشمس؟",
                "answer": "عطارد",
                "options": ["الزهرة", "عطارد", "الأرض", "المريخ"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم عدد أضلاع القفص الصدري للإنسان؟",
                "answer": "24 ضلعاً",
                "options": ["20 ضلعاً", "22 ضلعاً", "24 ضلعاً", "26 ضلعاً"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي درجة غليان الماء؟",
                "answer": "100 درجة مئوية",
                "options": ["90 درجة", "100 درجة مئوية", "110 درجة", "120 درجة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من هو مكتشف قانون الجاذبية؟",
                "answer": "إسحاق نيوتن",
                "options": ["ألبرت أينشتاين", "إسحاق نيوتن", "جاليليو", "كوبرنيكوس"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم يستغرق ضوء الشمس للوصول إلى الأرض؟",
                "answer": "8 دقائق",
                "options": ["4 دقائق", "6 دقائق", "8 دقائق", "10 دقائق"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو أكبر عضو داخلي في جسم الإنسان؟",
                "answer": "الكبد",
                "options": ["القلب", "الرئتان", "الكبد", "المعدة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد فقرات العمود الفقري؟",
                "answer": "33 فقرة",
                "options": ["31 فقرة", "32 فقرة", "33 فقرة", "34 فقرة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو الحيوان الأطول في العالم؟",
                "answer": "الزرافة",
                "options": ["الفيل", "الزرافة", "الجمل", "النعامة"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Extended Sports questions  
        sports_batch = [
            {
                "question": "كم لاعباً في فريق الهوكي؟",
                "answer": "6 لاعبين",
                "options": ["5 لاعبين", "6 لاعبين", "7 لاعبين", "8 لاعبين"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو الهداف التاريخي للمنتخب السعودي؟",
                "answer": "ماجد عبد الله",
                "options": ["سامي الجابر", "ماجد عبد الله", "ياسر القحطاني", "محمد الدعيع"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم مرة استضافت قطر كأس آسيا؟",
                "answer": "مرتان",
                "options": ["مرة واحدة", "مرتان", "ثلاث مرات", "لم تستضفها"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "في أي عام فازت مصر بكأس أفريقيا لأول مرة؟",
                "answer": "1957",
                "options": ["1955", "1956", "1957", "1958"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم عدد اللاعبين في فريق البيسبول؟",
                "answer": "9 لاعبين",
                "options": ["7 لاعبين", "8 لاعبين", "9 لاعبين", "10 لاعبين"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو أفضل لاعب في العالم لعام 2023؟",
                "answer": "ليونيل ميسي",
                "options": ["كريستيانو رونالدو", "ليونيل ميسي", "كيليان مبابي", "إيرلينج هالاند"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم دقيقة في الشوط الإضافي في كرة القدم؟",
                "answer": "15 دقيقة",
                "options": ["10 دقائق", "15 دقيقة", "20 دقيقة", "30 دقيقة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي دولة نشأت رياضة الكاراتيه؟",
                "answer": "اليابان",
                "options": ["الصين", "اليابان", "كوريا", "تايلاند"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Extended Literature questions
        literature_batch = [
            {
                "question": "من كتب 'رباعيات الخيام'؟",
                "answer": "عمر الخيام",
                "options": ["أبو نواس", "عمر الخيام", "المتنبي", "أبو العلاء المعري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو الكتاب الأكثر مبيعاً بعد القرآن والإنجيل؟",
                "answer": "الأمير لميكافيلي",
                "options": ["ألف ليلة وليلة", "الأمير لميكافيلي", "دون كيخوته", "الحرب والسلام"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو مؤلف 'زقاق المدق'؟",
                "answer": "نجيب محفوظ",
                "options": ["نجيب محفوظ", "يوسف إدريس", "توفيق الحكيم", "إحسان عبد القدوس"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "كم بيتاً في القصيدة؟",
                "answer": "يختلف حسب القصيدة",
                "options": ["10 أبيات", "20 بيتاً", "يختلف حسب القصيدة", "100 بيت"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من هو شاعر الفلاسفة؟",
                "answer": "أبو العلاء المعري",
                "options": ["المتنبي", "أبو تمام", "أبو العلاء المعري", "البحتري"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من كتب 'الحرافيش'؟",
                "answer": "نجيب محفوظ",
                "options": ["طه حسين", "نجيب محفوظ", "يوسف السباعي", "إحسان عبد القدوس"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي أطول سورة في القرآن؟",
                "answer": "سورة البقرة",
                "options": ["سورة آل عمران", "سورة البقرة", "سورة النساء", "سورة المائدة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من هو مؤلف 'رسالة الغفران'؟",
                "answer": "أبو العلاء المعري",
                "options": ["الجاحظ", "ابن المقفع", "أبو العلاء المعري", "ابن خلدون"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Extended Religion questions
        religion_batch = [
            {
                "question": "كم عدد الصلوات المفروضة؟",
                "answer": "5 صلوات",
                "options": ["3 صلوات", "4 صلوات", "5 صلوات", "6 صلوات"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هي أطول آية في القرآن؟",
                "answer": "آية الدين",
                "options": ["آية الكرسي", "آية الدين", "آية النور", "آية المواريث"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم مرة ذُكر اسم مريم في القرآن؟",
                "answer": "34 مرة",
                "options": ["24 مرة", "30 مرة", "34 مرة", "40 مرة"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي السورة التي لا تبدأ بالبسملة؟",
                "answer": "سورة التوبة",
                "options": ["سورة النمل", "سورة التوبة", "سورة الفاتحة", "سورة البقرة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد أبواب الجنة؟",
                "answer": "8 أبواب",
                "options": ["6 أبواب", "7 أبواب", "8 أبواب", "9 أبواب"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من هو النبي الذي لُقب بكليم الله؟",
                "answer": "موسى عليه السلام",
                "options": ["إبراهيم", "موسى عليه السلام", "عيسى", "محمد"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي يوم من أيام الأسبوع خُلق آدم؟",
                "answer": "يوم الجمعة",
                "options": ["يوم الإثنين", "يوم الأربعاء", "يوم الجمعة", "يوم الأحد"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم سنة نام أصحاب الكهف؟",
                "answer": "309 سنة",
                "options": ["100 سنة", "200 سنة", "309 سنة", "400 سنة"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Extended General Knowledge questions
        general_batch = [
            {
                "question": "كم لتراً في المتر المكعب؟",
                "answer": "1000 لتر",
                "options": ["100 لتر", "500 لتر", "1000 لتر", "10000 لتر"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو الرقم الروماني لـ 50؟",
                "answer": "L",
                "options": ["X", "V", "L", "C"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم شهراً في السنة له 31 يوماً؟",
                "answer": "7 أشهر",
                "options": ["5 أشهر", "6 أشهر", "7 أشهر", "8 أشهر"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هي اللغة الرسمية في البرازيل؟",
                "answer": "البرتغالية",
                "options": ["الإسبانية", "البرتغالية", "الإنجليزية", "الفرنسية"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد أيام شهر فبراير في السنة الكبيسة؟",
                "answer": "29 يوماً",
                "options": ["28 يوماً", "29 يوماً", "30 يوماً", "31 يوماً"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو أثقل المعادن؟",
                "answer": "الأوزميوم",
                "options": ["الذهب", "الرصاص", "الأوزميوم", "البلاتين"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم زاوية في المثلث؟",
                "answer": "3 زوايا",
                "options": ["2 زاوية", "3 زوايا", "4 زوايا", "5 زوايا"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "ما هو الحيوان الذي ينام واقفاً؟",
                "answer": "الحصان",
                "options": ["الجمل", "الحصان", "البقرة", "الفيل"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Extended Entertainment questions
        entertainment_batch = [
            {
                "question": "من هو مخرج فيلم 'العار'؟",
                "answer": "علي عبد الخالق",
                "options": ["يوسف شاهين", "علي عبد الخالق", "صلاح أبو سيف", "عاطف الطيب"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم فيلماً مثل فيه عادل إمام؟",
                "answer": "أكثر من 100 فيلم",
                "options": ["50 فيلماً", "75 فيلماً", "أكثر من 100 فيلم", "150 فيلماً"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من غنت 'ست الحبايب'؟",
                "answer": "فيروز",
                "options": ["أم كلثوم", "فيروز", "وردة", "نجاة الصغيرة"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "في أي عام عُرض مسلسل 'باب الحارة' لأول مرة؟",
                "answer": "2006",
                "options": ["2004", "2005", "2006", "2007"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو ملحن النشيد الوطني السعودي؟",
                "answer": "عبد الرحمن الخطيب",
                "options": ["طارق عبد الحكيم", "عبد الرحمن الخطيب", "سراج عمر", "غازي علي"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم جائزة حصل عليها فيلم 'المصير' ليوسف شاهين؟",
                "answer": "جائزة لجنة التحكيم في كان",
                "options": ["جائزة أفضل فيلم", "جائزة لجنة التحكيم في كان", "جائزة أفضل إخراج", "لم يحصل على جوائز"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "من هو مؤلف مسلسل 'رأفت الهجان'؟",
                "answer": "صالح مرسي",
                "options": ["أسامة أنور عكاشة", "صالح مرسي", "محفوظ عبد الرحمن", "وحيد حامد"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "في أي عام توفي الفنان أحمد زكي؟",
                "answer": "2005",
                "options": ["2003", "2004", "2005", "2006"],
                "difficulty": "متوسط",
                "points": 10
            }
        ]
        
        # Extended Technology questions
        technology_batch = [
            {
                "question": "ما هو أول موقع تواصل اجتماعي؟",
                "answer": "SixDegrees",
                "options": ["Facebook", "MySpace", "SixDegrees", "Friendster"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "كم عدد الميجابايت في الجيجابايت؟",
                "answer": "1024 ميجابايت",
                "options": ["100 ميجابايت", "1000 ميجابايت", "1024 ميجابايت", "2048 ميجابايت"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "من اخترع الإنترنت؟",
                "answer": "تيم بيرنرز لي",
                "options": ["بيل غيتس", "ستيف جوبز", "تيم بيرنرز لي", "مارك زوكربيرغ"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو أسرع كمبيوتر في العالم؟",
                "answer": "يتغير باستمرار",
                "options": ["Summit", "Fugaku", "يتغير باستمرار", "Tianhe-2"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "في أي عام أُطلق تويتر؟",
                "answer": "2006",
                "options": ["2004", "2005", "2006", "2007"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما معنى GPS؟",
                "answer": "نظام تحديد المواقع العالمي",
                "options": ["نظام تحديد المواقع العالمي", "نظام الملاحة العام", "نظام التتبع العالمي", "نظام المواقع الجغرافية"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد البكسلات في شاشة 4K؟",
                "answer": "8.3 مليون بكسل",
                "options": ["2 مليون", "4.1 مليون", "8.3 مليون بكسل", "16 مليون"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي أول لعبة فيديو؟",
                "answer": "Pong",
                "options": ["Tetris", "Pong", "Space Invaders", "Pac-Man"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Extended Arabic Culture questions
        arabic_culture_batch = [
            {
                "question": "ما هو الخط العربي الذي يُستخدم في كتابة المصحف؟",
                "answer": "الخط العثماني",
                "options": ["الخط الكوفي", "خط النسخ", "الخط العثماني", "خط الرقعة"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم بيتاً من الشعر في معلقة امرؤ القيس؟",
                "answer": "82 بيتاً",
                "options": ["70 بيتاً", "75 بيتاً", "82 بيتاً", "90 بيتاً"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هو الطبق الشعبي في مصر؟",
                "answer": "الكشري",
                "options": ["الكبسة", "الكشري", "المنسف", "الملوخية"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من أسس مكتبة الإسكندرية القديمة؟",
                "answer": "بطليموس الأول",
                "options": ["الإسكندر الأكبر", "بطليموس الأول", "كليوباترا", "رمسيس الثاني"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "question": "ما هي أقدم مدينة مأهولة في العالم؟",
                "answer": "دمشق",
                "options": ["القاهرة", "بغداد", "دمشق", "القدس"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "كم عدد الأشهر الحُرُم؟",
                "answer": "4 أشهر",
                "options": ["3 أشهر", "4 أشهر", "5 أشهر", "6 أشهر"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "question": "ما هو اليوم الوطني للسعودية؟",
                "answer": "23 سبتمبر",
                "options": ["21 سبتمبر", "22 سبتمبر", "23 سبتمبر", "24 سبتمبر"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "question": "من بنى الأزهر الشريف؟",
                "answer": "جوهر الصقلي",
                "options": ["صلاح الدين", "جوهر الصقلي", "عمرو بن العاص", "أحمد بن طولون"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Add all questions to database
        all_batches = [
            ("history", history_batch),
            ("geography", geography_batch),
            ("science", science_batch),
            ("sports", sports_batch),
            ("literature", literature_batch),
            ("religion", religion_batch),
            ("general", general_batch),
            ("entertainment", entertainment_batch),
            ("technology", technology_batch),
            ("arabic_culture", arabic_culture_batch)
        ]
        
        for category_id, questions in all_batches:
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
    
    def add_specialized_categories(self):
        """Add questions for specialized topics"""
        
        # Food & Cuisine questions
        food_questions = [
            {
                "category_id": "arabic_culture",
                "question": "ما هو المكون الرئيسي في الحمص؟",
                "answer": "الحمص",
                "options": ["العدس", "الحمص", "الفول", "البازلاء"],
                "difficulty": "سهل",
                "points": 5
            },
            {
                "category_id": "arabic_culture",
                "question": "من أي بلد أصل طبق الشاورما؟",
                "answer": "تركيا",
                "options": ["لبنان", "سوريا", "تركيا", "اليونان"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "general",
                "question": "ما هو الطبق الوطني في الأردن؟",
                "answer": "المنسف",
                "options": ["المقلوبة", "المنسف", "الزرب", "الكبسة"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Modern Arab World questions
        modern_arab = [
            {
                "category_id": "general",
                "question": "كم عدد سكان مصر تقريباً؟",
                "answer": "أكثر من 100 مليون",
                "options": ["80 مليون", "90 مليون", "أكثر من 100 مليون", "120 مليون"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "geography",
                "question": "ما هي أحدث دولة عربية استقلالاً؟",
                "answer": "جنوب السودان",
                "options": ["الإمارات", "قطر", "جيبوتي", "جنوب السودان"],
                "difficulty": "صعب",
                "points": 15
            },
            {
                "category_id": "general",
                "question": "أين يقع أطول برج في العالم؟",
                "answer": "دبي",
                "options": ["نيويورك", "دبي", "شنغهاي", "الرياض"],
                "difficulty": "سهل",
                "points": 5
            }
        ]
        
        # Islamic Golden Age questions
        islamic_golden = [
            {
                "category_id": "history",
                "question": "من هو مؤسس علم الجبر؟",
                "answer": "الخوارزمي",
                "options": ["ابن سينا", "الخوارزمي", "البيروني", "ابن الهيثم"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "science",
                "question": "من هو أبو الطب العربي؟",
                "answer": "ابن سينا",
                "options": ["الرازي", "ابن سينا", "ابن النفيس", "الزهراوي"],
                "difficulty": "متوسط",
                "points": 10
            },
            {
                "category_id": "history",
                "question": "في عهد أي خليفة كانت الدولة الإسلامية في أوج اتساعها؟",
                "answer": "الوليد بن عبد الملك",
                "options": ["عمر بن الخطاب", "هارون الرشيد", "الوليد بن عبد الملك", "عمر بن عبد العزيز"],
                "difficulty": "صعب",
                "points": 15
            }
        ]
        
        # Add all specialized questions
        for q in food_questions + modern_arab + islamic_golden:
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
    
    def save_massive_database(self):
        """Save the massively expanded database"""
        # Update metadata
        self.data["metadata"]["extracted_date"] = datetime.now().isoformat()
        self.data["metadata"]["total_questions"] = len(self.data["questions"])
        self.data["metadata"]["questions_per_category"] = {}
        
        # Count questions per category
        for category in self.data["categories"]:
            count = len([q for q in self.data["questions"] if q["category_id"] == category["id"]])
            self.data["metadata"]["questions_per_category"][category["id"]] = count
        
        # Save files
        with open('output/sho6sho6_extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        with open('output/sho6sho6_massive_database.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
            
        # Update CSV
        import csv
        with open('output/sho6sho6_questions.csv', 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['id', 'category_id', 'question', 'answer', 'difficulty', 'points', 'options']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for q in self.data["questions"]:
                row = q.copy()
                row['options'] = ' | '.join(row['options'])
                writer.writerow(row)
        
        print(f"\nMassive expansion complete!")
        print(f"Total questions: {len(self.data['questions'])}")
        print("\nQuestions per category:")
        for cat_id, count in self.data["metadata"]["questions_per_category"].items():
            cat_name = next(c["name"] for c in self.data["categories"] if c["id"] == cat_id)
            print(f"  {cat_name}: {count} questions")
            
    def generate_report(self):
        """Generate a detailed report"""
        report = {
            "total_questions": len(self.data["questions"]),
            "categories": len(self.data["categories"]),
            "difficulty_distribution": {"سهل": 0, "متوسط": 0, "صعب": 0},
            "points_distribution": {5: 0, 10: 0, 15: 0},
            "average_options": 4,
            "unique_answers": len(set(q["answer"] for q in self.data["questions"])),
            "extraction_date": datetime.now().isoformat()
        }
        
        for q in self.data["questions"]:
            report["difficulty_distribution"][q["difficulty"]] += 1
            report["points_distribution"][q["points"]] += 1
        
        with open('output/extraction_report.json', 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
            
        print("\nExtraction Report:")
        print(f"Total Questions: {report['total_questions']}")
        print(f"Unique Answers: {report['unique_answers']}")
        print(f"Categories: {report['categories']}")

def main():
    print("Massive Sho6sho6 Database Expansion")
    print("="*40)
    
    expander = MassiveExpander()
    
    print("\nAdding massive question batch...")
    expander.add_massive_question_batch()
    
    print("\nAdding specialized categories...")
    expander.add_specialized_categories()
    
    expander.save_massive_database()
    expander.generate_report()
    
    print("\n" + "="*40)
    print("Files created/updated:")
    print("- output/sho6sho6_extracted_data.json")
    print("- output/sho6sho6_massive_database.json")
    print("- output/sho6sho6_questions.csv")
    print("- output/extraction_report.json")

if __name__ == "__main__":
    main()