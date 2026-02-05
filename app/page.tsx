"use client";

import React, { useState, useEffect } from 'react';
import {
    BookOpen, Globe, Languages, List, MessageCircle, ChevronRight, ChevronLeft,
    Volume2, CheckCircle2, Star, X, Sparkles, Cat, Snowflake, Ghost, Bot,
    Utensils, Zap, Moon, Sun, Monitor, Loader2, Wand2, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 아이콘 매핑 객체
const ICON_MAP: any = {
    Cat: Cat,
    Snowflake: Snowflake,
    Ghost: Ghost,
    Bot: Bot,
    BookOpen: BookOpen,
    Utensils: Utensils,
    Zap: Zap,
    Moon: Moon,
    Sun: Sun,
    Monitor: Monitor
};

// 초기 데이터 (Initial Data)
const INITIAL_DATA: any = {
    beginner: [
        {
            id: 1,
            title: "나는 호랑이입니다",
            korean: "우리 집 고양이 '미미'는 거울을 봅니다. 미미는 '야옹' 하고 울지 않습니다. 미미는 '어흥!' 하고 웁니다. 미미는 자신이 아주 무서운 호랑이라고 생각합니다. 하지만 밥을 줄 때는 다시 귀여운 고양이가 됩니다.",
            theme: {
                primary: '#F59E0B',
                secondary: '#FEF3C7',
                accent: '#D97706',
                background: '#FFFBEB',
                text: '#78350F',
                icon: 'Cat'
            },
            translations: {
                en: "My cat 'Mimi' looks in the mirror. Mimi doesn't cry 'Meow'. Mimi roars 'Roar!'. Mimi thinks she is a very scary tiger. But when I give her food, she becomes a cute cat again.",
                th: "แมวของฉัน 'มิมี่' มองกระจก มิมี่ไม่ร้อง 'เหมียว' มิมี่คำราม 'โฮก!' มิมี่คิดว่าตัวเองเป็นเสือที่น่ากลัวมาก แต่พอฉันให้อาหาร มันก็กลับมาเป็นแมวน่ารักอีกครั้ง",
                jp: "うちの猫の「ミミ」は鏡を見ます。ミミは「ニャー」と鳴きません。ミミは「ガオー！」と鳴きます。ミミは自分がとても怖いトラだと思っています。でも、ご飯をあげる時はまた可愛い猫に戻ります。",
                de: "Meine Katze 'Mimi' schaut in den Spiegel. Mimi miaut nicht. Mimi brüllt 'Rawr!'. Mimi denkt, sie sei ein sehr gruseliger Tiger. Aber wenn ich ihr Futter gebe, wird sie wieder eine süße Katze.",
                cn: "我家的小猫‘咪咪’照镜子。咪咪不叫‘喵’。咪咪‘嗷呜！’地叫。咪咪觉得自己是一只非常可怕的老虎。但是当我给它饭吃的时候，它又变成了一只可爱的小猫。"
            },
            vocab: [
                {
                    word: "거울",
                    meanings: { en: "Mirror", th: "กระจก", jp: "鏡", de: "Spiegel", cn: "镜子" }
                },
                {
                    word: "호랑이",
                    meanings: { en: "Tiger", th: "เสือ", jp: "トラ", de: "Tiger", cn: "老虎" }
                },
                {
                    word: "무섭다",
                    match: "무서운",
                    meanings: { en: "Scary", th: "น่ากลัว", jp: "怖い", de: "Gruselig", cn: "可怕" }
                },
                {
                    word: "생각하다",
                    match: "생각합니다",
                    meanings: { en: "To think", th: "คิด", jp: "思う", de: "Denken", cn: "想" }
                },
                {
                    word: "고양이",
                    meanings: { en: "Cat", th: "แมว", jp: "猫", de: "Katze", cn: "猫" }
                }
            ],
            grammar: [
                {
                    pattern: "~입니다 / ~습니다",
                    explanations: {
                        en: "Formal polite sentence ending.",
                        th: "คำลงท้ายประโยคแบบสุภาพทางการ",
                        jp: "丁寧な文末表現（～です/～ます）。",
                        de: "Formelle höfliche Satzendung.",
                        cn: "正式礼貌的句尾（是...）。"
                    },
                    examples: [
                        { ko: "저는 학생입니다.", en: "I am a student." },
                        { ko: "날씨가 좋습니다.", en: "The weather is good." }
                    ]
                },
                {
                    pattern: "~(이)라고 생각하다",
                    explanations: {
                        en: "To think that [noun] is... (Quoting)",
                        th: "คิดว่า...เป็น... (การอ้างถึง)",
                        jp: "～だと思う（引用）。",
                        de: "Denken, dass [Nomen] ... ist.",
                        cn: "觉得...是...（引用）。"
                    },
                    examples: [
                        { ko: "그것은 사랑이라고 생각해요.", en: "I think that is love." },
                        { ko: "이것은 좋은 기회라고 생각합니다.", en: "I think this is a good opportunity." }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "마법의 냉장고",
            korean: "철수의 집 냉장고는 이상합니다. 밤 12시가 되면 냉장고가 말을 합니다. '배가 고파요, 케이크를 주세요.' 철수는 깜짝 놀라서 우유를 줍니다. 냉장고는 우유를 마시고 다시 조용해집니다.",
            theme: {
                primary: '#0EA5E9',
                secondary: '#E0F2FE',
                accent: '#0284C7',
                background: '#F0F9FF',
                text: '#0C4A6E',
                icon: 'Snowflake'
            },
            translations: {
                en: "Cheolsu's refrigerator is strange. At 12 AM, the refrigerator speaks. 'I'm hungry, give me cake.' Cheolsu is surprised and gives it milk. The refrigerator drinks the milk and becomes quiet again.",
                th: "ตู้เย็นบ้านชอลซูแปลกมาก ตอนเที่ยงคืน ตู้เย็นจะพูดว่า 'หิวจัง ขอกินเค้กหน่อย' ชอลซูตกใจเลยให้นมไป ตู้เย็นดื่มนมแล้วก็เงียบไปอีกครั้ง",
                jp: "チョル스의家の冷蔵庫は変です。夜12時になると冷蔵庫が話します。「お腹が空いた、ケーキをください」 チョルス은びっくりして牛乳をあげます。冷蔵庫は牛乳を飲んでまた静かになります。",
                de: "Cheolsus Kühlschrank ist seltsam. Um Mitternacht spricht der Kühlschrank. 'Ich habe Hunger, gib mir Kuchen.' Cheolsu ist überrascht und gibt ihm Milch. Der Kühlschrank trinkt die Milch und wird wieder still.",
                cn: "哲秀家的冰箱很奇怪。一到晚上12点，冰箱就会说话。‘肚子饿了，给我蛋糕。’哲秀吓了一跳，给它牛奶。冰箱喝了牛奶后又变得安静了。"
            },
            vocab: [
                {
                    word: "냉장고",
                    meanings: { en: "Refrigerator", th: "ตู้เย็น", jp: "冷蔵庫", de: "Kühlschrank", cn: "冰箱" }
                },
                {
                    word: "이상하다",
                    match: "이상합니다",
                    meanings: { en: "Strange", th: "แปลก", jp: "変だ", de: "Seltsam", cn: "奇怪" }
                },
                {
                    word: "깜짝 놀라다",
                    match: "깜짝 놀라서",
                    meanings: { en: "To be startled", th: "ตกใจ", jp: "びっくりする", de: "Überrascht sein", cn: "吓一跳" }
                },
                {
                    word: "우유",
                    meanings: { en: "Milk", th: "นม", jp: "牛乳", de: "Milch", cn: "牛奶" }
                }
            ],
            grammar: [
                {
                    pattern: "~(으)면",
                    explanations: {
                        en: "If / When (Condition/Assumption).",
                        th: "ถ้า / เมื่อ (เงื่อนไข/สมมติฐาน)",
                        jp: "～なら / ～すれば（条件/仮定）。",
                        de: "Wenn / Falls (Bedingung).",
                        cn: "如果/当...时候（条件/假设）。"
                    },
                    examples: [
                        { ko: "시간이 있으면 영화를 봐요.", en: "If I have time, I watch a movie." },
                        { ko: "봄이 오면 꽃이 핍니다.", en: "When spring comes, flowers bloom." }
                    ]
                },
                {
                    pattern: "~아/어/여 주세요",
                    explanations: {
                        en: "Please give me / Please do for me (Request).",
                        th: "กรุณา...ให้หน่อย (การร้องขอ)",
                        jp: "～してください（依頼）。",
                        de: "Bitte gib mir / Bitte tu für mich (Bitte).",
                        cn: "请给我/请帮我做...（请求）。"
                    },
                    examples: [
                        { ko: "창문을 열어 주세요.", en: "Please open the window." },
                        { ko: "도와 주세요.", en: "Please help me." }
                    ]
                }
            ]
        }
    ],
    intermediate: [
        {
            id: 1,
            title: "편의점 유령의 비밀",
            korean: "편의점 알바생 지수는 매일 밤 선글라스를 낀 손님을 봅니다. 그 손님은 항상 컵라면 두 개를 사지만, 젓가락은 가져가지 않습니다. 어느 날 지수가 물었습니다. '젓가락 필요 없으세요?' 손님은 웃으며 대답했습니다. '저는 손이 없어서요.'",
            theme: {
                primary: '#8B5CF6',
                secondary: '#EDE9FE',
                accent: '#7C3AED',
                background: '#F5F3FF',
                text: '#4C1D95',
                icon: 'Ghost'
            },
            translations: {
                en: "Convenience store part-timer Jisoo sees a customer wearing sunglasses every night. The customer always buys two cup noodles but never takes chopsticks. One day, Jisoo asked, 'Don't you need chopsticks?' The customer smiled and replied, 'I don't have hands.'",
                th: "จีซู พนักงานพาร์ทไทม์ร้านสะดวกซื้อเห็นลูกค้าใส่แว่นกันแดดทุกคืน ลูกค้าคนนั้นซื้อบะหมี่ถ้วยสองถ้วยเสมอ แต่ไม่เคยเอาตะเกียบไป วันหนึ่งจีซูถามว่า 'ไม่รับตะเกียบเหรอคะ?' ลูกค้ายิ้มแล้วตอบว่า 'พอดีผมไม่มีมือน่ะครับ'",
                jp: "コンビニのバイトのジスは、毎晩サングラスをかけたお客さんを見ます。そのお客さんはいつもカップラーメンを2つ買いますが、箸は持って行きません。ある日、ジスが聞きました。「お箸、いらないんですか？」お客さんは笑って答えました。「私は手がないので。」",
                de: "Die Aushilfe im Supermarkt, Jisoo, sieht jede Nacht einen Kunden mit Sonnenbrille. Der Kunde kauft immer zwei Bechernudeln, nimmt aber nie Stäbchen mit. Eines Tages fragte Jisoo: 'Brauchen Sie keine Stäbchen?' Der Kunde lächelte und antwortete: 'Ich habe keine Hände.'",
                cn: "便利店兼职生智秀每天晚上都会看到一位戴墨镜的客人。那位客人总是买两盒泡面，但从不拿筷子。有一天，智秀问：‘不需要筷子吗？’客人笑着回答：‘因为我没有手。’"
            },
            vocab: [
                {
                    word: "편의점",
                    meanings: { en: "Convenience Store", th: "ร้านสะดวกซื้อ", jp: "コンビニ", de: "Supermarkt", cn: "便利店" }
                },
                {
                    word: "알바생",
                    meanings: { en: "Part-timer", th: "พนักงานพาร์ทไทม์", jp: "バイト", de: "Aushilfe", cn: "兼职生" }
                },
                {
                    word: "컵라면",
                    meanings: { en: "Cup Noodles", th: "บะหมี่ถ้วย", jp: "カップラーメン", de: "Bechernudeln", cn: "杯面" }
                },
                {
                    word: "손님",
                    meanings: { en: "Customer", th: "ลูกค้า", jp: "お客さん", de: "Kunde", cn: "顾客" }
                }
            ],
            grammar: [
                {
                    pattern: "~(으)ㄴ/는 데",
                    explanations: {
                        en: "Providing background information.",
                        th: "การให้ข้อมูลเบื้องหลัง / เกริ่นนำ",
                        jp: "背景情報を提供する（～ですが/～ので）。",
                        de: "Hintergrundinformationen geben.",
                        cn: "提供背景信息（...的时候/하지만）。"
                    },
                    examples: [
                        { ko: "밥을 먹는데 전화가 왔어요.", en: "I was eating when the phone rang." },
                        { ko: "비가 오는데 우산이 없어요.", en: "It's raining, but I don't have an umbrella." }
                    ]
                },
                {
                    pattern: "~(으)시겠어요?",
                    explanations: {
                        en: "Would you like...? (Polite suggestion).",
                        th: "จะรับ...ไหมคะ/ครับ? (ข้อเสนอแบบสุภาพ)",
                        jp: "～なさいますか？（丁寧な提案）。",
                        de: "Möchten Sie...? (Höflicher Vorschlag).",
                        cn: "您要...吗？（礼貌的建议）。"
                    },
                    examples: [
                        { ko: "커피 한 잔 하시겠어요?", en: "Would you like a cup of coffee?" },
                        { ko: "메시지를 남기시겠어요?", en: "Would you like to leave a message?" }
                    ]
                }
            ]
        }
    ],
    advanced: [
        {
            id: 1,
            title: "AI 상사와의 회식",
            korean: "새로 부임한 김 부장님은 인공지능 로봇이라는 소문이 파다했습니다. 회식 자리에서 김 부장님은 소주를 마시는 대신 기계유를 주문하려다 멈칫했습니다. 직원들이 모두 숨을 죽이고 바라보자, 부장님은 너스레를 떨며 말했습니다. '농담입니다. 요즘 유행하는 MZ세대 개그 코드를 배워봤습니다.' 하지만 아무도 웃지 못했습니다. 그의 등 뒤로 충전 케이블이 살짝 보였기 때문입니다.",
            theme: {
                primary: '#10B981',
                secondary: '#D1FAE5',
                accent: '#059669',
                background: '#ECFDF5',
                text: '#064E3B',
                icon: 'Bot'
            },
            translations: {
                en: "Rumors were widespread that the newly appointed Manager Kim was an AI robot. At the company dinner, Manager Kim hesitated while trying to order machine oil instead of soju. As all the employees held their breath and watched, the manager joked, 'I'm kidding. I tried learning the trendy Gen Z humor code.' But no one could laugh. It was because a charging cable was slightly visible behind his back.",
                th: "มีข่าวลือหนาหูว่าผู้จัดการคิมที่เพิ่งมารับตำแหน่งใหม่เป็นหุ่นยนต์ AI ในงานเลี้ยงบริษัท ผู้จัดการคิมชะงักตอนที่กำลังจะสั่งน้ำมันเครื่องแทนโซจู พอพนักงานทุกคนกลั้นหายใจมองดู ผู้จัดการก็พูดติดตลกว่า 'ล้อเล่นครับ ผมลองเรียนรู้มุกตลกแบบชาว Gen Z ที่กำลังฮิตดู' แต่ไม่มีใครหัวเราะออก เพราะเห็นสายชาร์จโผล่ออกมาข้างหลังเขาแวบหนึ่ง",
                jp: "新しく赴任したキム部長は人工知能ロボットだという噂が広まっていました。飲み会の席でキム部長は、焼酎を飲む代わりに機械油を注文しようとして止まりました。社員たちが皆息をのんで見つめると、部長は冗談めかして言いました。「冗談です。最近流行りのMZ世代のギャグコードを学んでみました。」しかし誰も笑えませんでした。彼の背中の後ろに充電ケーブル이ちらっと見えたからです。",
                de: "Es gab viele Gerüchte, dass der neu ernannte Manager Kim ein KI-Roboter sei. Beim Firmenessen zögerte Manager Kim, als er Maschinenöl statt Soju bestellen wollte. Als alle Mitarbeiter den Atem anhielten und zuschauten, scherzte der Manager: 'Nur ein Witz. Ich habe versucht, den trendigen Humor der Gen Z zu lernen.' Aber niemand konnte lachen. Denn hinter seinem Rücken war ein Ladekabel leicht sichtbar.",
                cn: "传闻新上任的金部长是人工智能机器人。在公司聚餐时，金部长正要点机械油而不是烧酒，突然停住了。当所有员工屏住呼吸看着他时，部长开玩笑说：‘开玩笑的。我试着学了一下最近流行的MZ一代的搞笑代码。’但是没人能笑得出来。因为在他的背后隐约可以看到充电线。"
            },
            vocab: [
                {
                    word: "부임하다",
                    match: "부임한",
                    meanings: { en: "To start a new post", th: "รับตำแหน่ง", jp: "赴任하는", de: "Einen neuen Posten antreten", cn: "上任" }
                },
                {
                    word: "소문이 파다하다",
                    match: "소문이 파다했습니다",
                    meanings: { en: "Rumors are widespread", th: "ข่าวลือแพร่สะพัด", jp: "噂가広まる", de: "Gerüchte sind weit verbreitet", cn: "传闻遍布" }
                },
                {
                    word: "숨을 죽이다",
                    match: "숨을 죽이고",
                    meanings: { en: "To hold one's breath", th: "กลั้นหายใจ", jp: "息をのむ", de: "Den Atem anhalten", cn: "屏住呼吸" }
                },
                {
                    word: "너스레를 떨다",
                    match: "너스레를 떨며",
                    meanings: { en: "To chat slyly/jokingly", th: "พูดติดตลก", jp: "冗談めかして言う", de: "Scherzen", cn: "贫嘴/开玩笑" }
                }
            ],
            grammar: [
                {
                    pattern: "~(으)려다(가)",
                    explanations: {
                        en: "Intended to do something but stopped/changed.",
                        th: "ตั้งใจจะทำ...แตเปลี่ยนใจ/หยุด",
                        jp: "～しようとして（途中で止める/変わる）。",
                        de: "Beabsichtigte etwas zu tun, hörte aber auf / änderte es.",
                        cn: "想要做...（由于某种原因中断或改变）。"
                    },
                    examples: [
                        { ko: "집에 가려다가 친구를 만났어요.", en: "I was about to go home but met a friend." },
                        { ko: "전화를 하려다가 문자를 보냈어요.", en: "I intended to call but sent a text instead." }
                    ]
                },
                {
                    pattern: "~기 때문이다",
                    explanations: {
                        en: "Because (reason/cause).",
                        th: "เพราะ... (เหตุผล/สาเหตุ)",
                        jp: "～だからです（理由/原因）。",
                        de: "Weil (Grund/Ursache).",
                        cn: "因为...（理由/原因）。"
                    },
                    examples: [
                        { ko: "늦잠을 잤기 때문에 지각했어요.", en: "I was late because I overslept." },
                        { ko: "건강하기 때문입니다.", en: "It is because I am healthy." }
                    ]
                }
            ]
        }
    ]
};

// 언어 선택 컴포넌트
const LanguageSelector = ({ currentLang, onSelect, theme }: any) => (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
        {[
            { code: 'th', label: 'Thai 🇹🇭' },
            { code: 'en', label: 'English 🇺🇸' },
            { code: 'jp', label: 'Japanese 🇯🇵' },
            { code: 'cn', label: 'Chinese 🇨🇳' },
            { code: 'de', label: 'German 🇩🇪' }
        ].map((lang) => (
            <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                style={{
                    backgroundColor: currentLang === lang.code ? theme.primary : 'white',
                    color: currentLang === lang.code ? 'white' : '#64748b',
                    borderColor: currentLang === lang.code ? theme.primary : '#e2e8f0'
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200 whitespace-nowrap uppercase"
            >
                {lang.label}
            </button>
        ))}
    </div>
);

// AI 생성 모달 컴포넌트
const GeneratorModal = ({ onClose, onGenerate, isGenerating, currentLevel }: any) => {
    const [topic, setTopic] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Create AI Story</h3>
                    <p className="text-slate-500 text-sm mt-1">
                        Create a custom {currentLevel} Korean story!
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            What should the story be about?
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. A robot eating Kimchi, First snow in Seoul..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        />
                    </div>

                    <button
                        onClick={() => onGenerate(topic)}
                        disabled={!topic.trim() || isGenerating}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Magic...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" />
                                Generate Story
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function App() {
    const [storyData, setStoryData] = useState(INITIAL_DATA);
    const [currentLevel, setCurrentLevel] = useState('beginner');
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [targetLanguage, setTargetLanguage] = useState('en');
    const [showTranslation, setShowTranslation] = useState(false);
    const [activeTab, setActiveTab] = useState('story');

    // TTS & Highlighting State
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const [currentCharIndex, setCurrentCharIndex] = useState(-1);

    // AI Generator State
    const [showGenerator, setShowGenerator] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const stories = storyData[currentLevel];
    const currentStory = stories[currentStoryIndex];

    const theme = currentStory.theme || {
        primary: '#4F46E5', secondary: '#EEF2FF', accent: '#4338CA', background: '#F8FAFC', text: '#1E293B', icon: 'BookOpen'
    };

    const ThemeIcon = ICON_MAP[theme.icon] || BookOpen;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        setSpeakingId(null);
        setCurrentCharIndex(-1);
    }, [currentStoryIndex, currentLevel, activeTab]);

    const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setShowTranslation(false);
            setActiveTab('story');
        } else {
            // Auto-generate a new story with a random fun topic
            const autoTopics = [
                "A talking cat in Seoul", "First snow in a Hanok village", "A robot trying spicy kimchi",
                "A student studying at a 24h cafe", "A rainy day in Myeongdong", "Making new friends at a flea market",
                "A time traveler visiting Gyeongbokgung", "Learning to play the Gayageum", "A busy morning in Gangnam",
                "Watching a movie at the Han River", "Robot's first experience at a Korean Sauna",
                "A ghost searching for the best Tteokbokki", "An astronaut visiting Jeju Island",
                "A magic umbrella that translates Korean"
            ];
            const randomTopic = autoTopics[Math.floor(Math.random() * autoTopics.length)];
            generateStory(randomTopic);
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
        } else {
            // Loop to the last story
            setCurrentStoryIndex(stories.length - 1);
        }
        setShowTranslation(false);
        setActiveTab('story');
    };

    const handleLevelChange = (level: string) => {
        setCurrentLevel(level);
        setCurrentStoryIndex(0);
        setShowTranslation(false);
        setActiveTab('story');
        setIsMenuOpen(false);
    };

    const generateStory = async (topic: string) => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, currentLevel })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const newStory = await response.json();
            newStory.id = Date.now();

            setStoryData((prev: any) => {
                const updatedLevelStories = [...prev[currentLevel], newStory];
                // Set the index to the newly added story
                setCurrentStoryIndex(updatedLevelStories.length - 1);
                return {
                    ...prev,
                    [currentLevel]: updatedLevelStories
                };
            });

            setShowGenerator(false);
            setShowTranslation(false);
            setActiveTab('story');
        } catch (error: any) {
            console.error("Story generation failed:", error);

            let message = "스토리 생성에 실패했습니다.";
            if (error.message.includes("API Key")) {
                message += "\n\nVercel 설정에서 'GEMINI_API_KEY' 환경 변수가 설정되어 있는지 확인해주세요.";
            } else {
                message += `\n오류: ${error.message}`;
            }
            alert(message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSpeak = (text: string, id: string, e?: any) => {
        if (e) e.stopPropagation();

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            if (speakingId === id && isSpeaking) {
                setIsSpeaking(false);
                setSpeakingId(null);
                setCurrentCharIndex(-1);
                return;
            }
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.9;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setSpeakingId(id);
            setCurrentCharIndex(0);
        };

        utterance.onboundary = (event) => {
            if (event.name === 'word' || event.name === 'sentence') {
                setCurrentCharIndex(event.charIndex);
            }
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setSpeakingId(null);
            setCurrentCharIndex(-1);
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
            setSpeakingId(null);
            setCurrentCharIndex(-1);
        };

        window.speechSynthesis.speak(utterance);
    };

    const renderTextWithHighlight = (text: string, id: string) => {
        const words = text.split(' ');
        let charAccumulator = 0;

        return words.map((word, index) => {
            const startIndex = charAccumulator;
            const endIndex = charAccumulator + word.length;

            const isActive = speakingId === id &&
                currentCharIndex >= startIndex &&
                currentCharIndex < endIndex + 1;

            charAccumulator += word.length + 1;

            return (
                <span
                    key={index}
                    style={{
                        backgroundColor: isActive ? theme.secondary : 'transparent',
                        color: isActive ? theme.primary : 'inherit',
                        fontWeight: isActive ? 'bold' : 'normal'
                    }}
                    className="transition-all duration-200 rounded px-0.5 -mx-0.5 inline-block"
                >
                    {word}{' '}
                </span>
            );
        });
    };

    return (
        <div
            className="min-h-screen font-sans transition-colors duration-500"
            style={{ backgroundColor: theme.background, color: theme.text }}
        >
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: theme.secondary, color: theme.primary }}
                        >
                            <ThemeIcon className="w-6 h-6" />
                        </div>
                        <h1 className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            ChatStudy
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex gap-1 text-sm font-medium">
                                {['beginner', 'intermediate', 'advanced'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => handleLevelChange(level)}
                                        style={{
                                            backgroundColor: currentLevel === level ? theme.secondary : 'transparent',
                                            color: currentLevel === level ? theme.primary : '#94a3b8'
                                        }}
                                        className="px-3 py-1.5 rounded-full transition-all duration-300 capitalize hover:opacity-80"
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowGenerator(true)}
                                style={{ backgroundColor: theme.primary }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all w-fit"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Create</span>
                            </button>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 sm:hidden text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 sm:hidden"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 p-4 shadow-xl z-50 sm:hidden"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                                        Skill Level
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['beginner', 'intermediate', 'advanced'].map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => handleLevelChange(level)}
                                                style={{
                                                    backgroundColor: currentLevel === level ? theme.secondary : '#f8fafc',
                                                    color: currentLevel === level ? theme.primary : '#64748b',
                                                    border: `1px solid ${currentLevel === level ? theme.primary + '20' : '#e2e8f0'}`
                                                }}
                                                className="px-3 py-3 rounded-xl text-sm font-bold capitalize transition-all active:scale-95"
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowGenerator(true);
                                            setIsMenuOpen(false);
                                        }}
                                        style={{ backgroundColor: theme.primary }}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Create New Story
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 pb-32">
                <div className="flex justify-between items-center mb-6 text-sm font-semibold opacity-60">
                    <span>STORY {currentStoryIndex + 1} OF {stories.length}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        LEVEL: {currentLevel.toUpperCase()}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentLevel}-${currentStoryIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-card bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white overflow-hidden mb-6"
                    >
                        <div className="p-8">
                            <h2 className="text-3xl font-black mb-8 flex items-center justify-between leading-tight" style={{ color: theme.text }}>
                                <span className="flex-1 mr-4">
                                    {renderTextWithHighlight(currentStory.title, 'title')}
                                </span>
                                <button
                                    onClick={(e) => handleSpeak(currentStory.title, 'title', e)}
                                    style={{
                                        backgroundColor: speakingId === 'title' ? theme.secondary : 'white',
                                        color: theme.primary
                                    }}
                                    className="p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95"
                                >
                                    <Volume2 className="w-6 h-6" />
                                </button>
                            </h2>

                            <div className="flex gap-1 bg-slate-100/50 p-1 rounded-2xl mb-8">
                                {['story', 'vocab', 'grammar'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 capitalize ${activeTab === tab
                                            ? 'bg-white shadow-sm text-slate-900 border border-slate-200'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[350px]">
                                {activeTab === 'story' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-8"
                                    >
                                        <div className="relative">
                                            <div className="flex justify-end mb-6">
                                                <button
                                                    onClick={(e) => handleSpeak(currentStory.korean, 'story-main', e)}
                                                    style={{
                                                        backgroundColor: speakingId === 'story-main' ? theme.secondary : 'white',
                                                        color: theme.primary,
                                                        borderColor: theme.primary + '20'
                                                    }}
                                                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-black shadow-sm border hover:shadow-md transition-all active:scale-95"
                                                >
                                                    <Volume2 className="w-4 h-4" />
                                                    {speakingId === 'story-main' ? 'PAUSE' : 'READ ALL'}
                                                </button>
                                            </div>

                                            <div className="text-2xl leading-[2] font-bold break-keep text-slate-800" style={{ color: theme.text }}>
                                                {renderTextWithHighlight(currentStory.korean, 'story-main')}
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-slate-100 mt-8">
                                            <button
                                                onClick={() => setShowTranslation(!showTranslation)}
                                                style={{ color: theme.primary }}
                                                className="flex items-center gap-2 font-bold text-sm mb-4 hover:opacity-80 transition-opacity bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
                                            >
                                                <Globe className="w-4 h-4" />
                                                {showTranslation ? 'HIDE TRANSLATION' : 'SHOW TRANSLATION'}
                                            </button>

                                            <AnimatePresence>
                                                {showTranslation && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="bg-slate-50/80 rounded-2xl p-6 mt-2 border border-slate-100">
                                                            <LanguageSelector
                                                                currentLang={targetLanguage}
                                                                onSelect={setTargetLanguage}
                                                                theme={theme}
                                                            />
                                                            <p className="leading-relaxed text-xl font-medium text-slate-600">
                                                                {currentStory.translations[targetLanguage]}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'vocab' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-400">
                                                <List className="w-4 h-4" /> Key Vocabulary
                                            </h3>
                                            <div className="scale-90 origin-top-left sm:origin-right">
                                                <LanguageSelector
                                                    currentLang={targetLanguage}
                                                    onSelect={setTargetLanguage}
                                                    theme={theme}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-3">
                                            {currentStory.vocab.map((v: any, i: number) => (
                                                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group">
                                                    <button
                                                        onClick={(e) => handleSpeak(v.word, `vocab-${i}`, e)}
                                                        style={{
                                                            backgroundColor: speakingId === `vocab-${i}` ? theme.secondary : theme.background,
                                                            color: theme.primary
                                                        }}
                                                        className="p-3 rounded-xl transition-colors flex-shrink-0"
                                                    >
                                                        <Volume2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="flex-1">
                                                        <span style={{ color: theme.primary }} className="font-extrabold text-xl block">
                                                            {renderTextWithHighlight(v.word, `vocab-${i}`)}
                                                        </span>
                                                        <span className="text-slate-500 font-medium">
                                                            {v.meanings[targetLanguage] || v.meanings['en']}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'grammar' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-400">
                                                <CheckCircle2 className="w-4 h-4" /> Grammar Points
                                            </h3>
                                            <div className="scale-90 origin-top-left sm:origin-right">
                                                <LanguageSelector
                                                    currentLang={targetLanguage}
                                                    onSelect={setTargetLanguage}
                                                    theme={theme}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-6">
                                            {currentStory.grammar.map((g: any, i: number) => (
                                                <div key={i} className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div style={{ color: theme.primary }} className="font-black text-2xl">{g.pattern}</div>
                                                    </div>
                                                    <div className="text-slate-600 font-medium text-base mb-8 leading-relaxed">
                                                        {g.explanations[targetLanguage] || g.explanations['en']}
                                                    </div>

                                                    {g.examples && (
                                                        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100">
                                                            <div style={{ color: theme.accent }} className="flex items-center gap-2 text-xs font-black mb-4 uppercase tracking-[0.1em]">
                                                                <Sparkles className="w-3.5 h-3.5" /> Examples
                                                            </div>
                                                            <div className="space-y-5">
                                                                {g.examples.map((ex: any, j: number) => (
                                                                    <div key={j} className="flex gap-4 items-start">
                                                                        <button
                                                                            onClick={(e) => handleSpeak(ex.ko, `grammar-${i}-${j}`, e)}
                                                                            style={{
                                                                                backgroundColor: speakingId === `grammar-${i}-${j}` ? theme.secondary : 'white',
                                                                                color: theme.primary
                                                                            }}
                                                                            className="p-2 rounded-xl shadow-sm border border-slate-100 transition-colors flex-shrink-0"
                                                                        >
                                                                            <Volume2 className="w-4 h-4" />
                                                                        </button>
                                                                        <div>
                                                                            <div className="font-bold text-slate-800 mb-1">
                                                                                {renderTextWithHighlight(ex.ko, `grammar-${i}-${j}`)}
                                                                            </div>
                                                                            <div className="text-slate-400 text-sm font-medium">
                                                                                {ex[targetLanguage] || ex['en']}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-white/50 p-6 z-20">
                    <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
                        <button
                            onClick={handlePrevStory}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            PREV
                        </button>

                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                            화이팅! KEEP GOING
                        </div>

                        <button
                            onClick={handleNextStory}
                            disabled={isGenerating}
                            style={{
                                backgroundColor: isGenerating ? '#f8fafc' : theme.primary,
                                color: isGenerating ? '#cbd5e1' : 'white',
                                boxShadow: isGenerating ? 'none' : `0 8px 20px -4px ${theme.primary}50`
                            }}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 disabled:scale-100"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    GENERATING...
                                </>
                            ) : currentStoryIndex === stories.length - 1 ? (
                                <>
                                    AI NEXT STORY
                                    <Sparkles className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    NEXT STORY
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {showGenerator && (
                    <GeneratorModal
                        onClose={() => setShowGenerator(false)}
                        onGenerate={generateStory}
                        isGenerating={isGenerating}
                        currentLevel={currentLevel}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
